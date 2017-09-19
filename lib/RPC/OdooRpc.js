"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const OdooXmlRpc = require("odoo-xmlrpc");
const _ = require("lodash");
const ILogger_1 = require("../Logger/ILogger");
const OdooConfiguration_1 = require("../Config/OdooConfiguration");
const OdooSearchResult_1 = require("./OdooSearchResult");
const Company_1 = require("../Entities/Common/Company");
const OdooCountResult_1 = require("./OdooCountResult");
const OdooXmlRpcConfiguration_1 = require("../Config/OdooXmlRpcConfiguration");
const IOdooRpc_1 = require("./IOdooRpc");
const CacheClass = require("memory-cache").Cache;
let OdooRpc = OdooRpc_1 = class OdooRpc {
    // region Cache
    /**
     * Create and Get
     * @returns {any}
     */
    getCache() {
        if (!this.xmlRpcConfig.cache) {
            return null;
        }
        if (this.connectionCache == null) {
            this.connectionCache = new CacheClass();
        }
        return this.connectionCache;
    }
    /**
     * Get connection from Cache
     * @param {OdooCompany} company
     * @returns {}
     */
    getCachedConnection(company) {
        if (!this.xmlRpcConfig.cache) {
            return null;
        }
        this.logger.debug("Search Cache Odoo connection for %s (%s)", company.name, company.id);
        return this.getCache().get(company.id);
    }
    /**
     * Set connection to cache
     * @param {OdooCompany} company
     * @param {} odoo
     */
    setCachedConnection(company, odoo) {
        if (!this.xmlRpcConfig.cache) {
            return null;
        }
        this.logger.debug("Cache Odoo connection for %s", company.name);
        this.getCache().put(company.id, odoo, this.xmlRpcConfig.connectionCacheTimeoutMs);
    }
    // endregion
    // region Odoo Connection
    /**
     * Get an XML RPC connection to Odoo (odoo-xmlrpc)
     * @param {OdooCompany} company
     * @returns {Promise<>}
     */
    getOdooConnection(company) {
        const self = this;
        return new Promise(function (success, error) {
            const cachedConnection = self.getCachedConnection(company);
            if (cachedConnection) {
                self.logger.debug("Use Cache Odoo connection for %s", company.name);
                success(cachedConnection);
                return;
            }
            const odooConfiguration = {
                url: self.getOdooUrl(),
                db: self.config.database,
                username: company.username,
                password: company.password
            };
            const odoo = new OdooXmlRpc(odooConfiguration);
            odoo.connect(function (err) {
                if (err) {
                    self.logger.error("Error connecting to Odoo server %s with %s", odooConfiguration.url, odooConfiguration.username);
                    error(err);
                    return;
                }
                self.logger.debug("Connected to Odoo server %s with %s", odooConfiguration.url, odooConfiguration.username);
                self.setCachedConnection(company, odoo);
                success(odoo);
            });
        });
    }
    /**
     * Provide Odoo URL based on configuration
     * @returns {string}
     */
    getOdooUrl() {
        return "http" + (this.xmlRpcConfig.odooUrlHttps ? "s" : "") + "://" + this.config.database + this.xmlRpcConfig.odooUrl;
    }
    // endregion
    // region Common Search capabilities
    /**
     * Search all items from N with batch of limits
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @param {Array} fields
     * @param {number} from
     * @param {number} limit
     * @returns {Promise<OdooSearchResult>}
     */
    searchReadOneCompany(company, model, query = [], fields = [], from = 0, limit = null) {
        if (limit == null) {
            limit = this.xmlRpcConfig.defaultLimit;
        }
        const self = this;
        return new Promise(function (success, error) {
            self.getOdooConnection(company)
                .then(odoo => {
                return self.searchOneIncremental(odoo, model, query, fields, from, limit);
            })
                .then(res => {
                success(res);
            })
                .catch(function (err) {
                error(err);
            });
        })
            .then(res => {
            const t = new OdooSearchResult_1.OdooSearchResult();
            t.company = OdooRpc_1.fromOdooCompany(company);
            t.items = res;
            return t;
        });
    }
    /**
     * Search items in one company from N with batch size of limit
     * @param {} odoo
     * @param {string} model
     * @param {Array} query
     * @param {Array} fields
     * @param {number} from
     * @param {number} limit
     * @returns {Promise}
     */
    searchOneIncremental(odoo, model, query = [], fields = [], from = 0, limit = null) {
        if (limit == null) {
            limit = this.xmlRpcConfig.defaultLimit;
        }
        const self = this;
        return new Promise(function (success, error) {
            const inParams = [];
            inParams.push(query || []);
            inParams.push(fields || []);
            inParams.push(from); // offset
            inParams.push(limit); // limit
            const params = [];
            params.push(inParams);
            odoo.execute_kw(model, IOdooRpc_1.OdooOperation.searchRead, params, function (err, value) {
                if (err) {
                    error(err);
                    return;
                }
                if (value.length >= limit) {
                    self.logger.info("continue search %s at %s", model, from + limit);
                    self.searchOneIncremental(odoo, model, query, fields, from + limit)
                        .then(function (res) {
                        success(value.concat(res));
                    });
                    return;
                }
                self.logger.info("search completed on %s with %s elements", model, value.length);
                success(value);
            });
        });
    }
    /**
     * Count number of items on One company
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @returns {Promise<OdooCountResult>}
     */
    countOneCompany(company, model, query = []) {
        const self = this;
        return new Promise(function (success, error) {
            self.getOdooConnection(company)
                .then(odoo => {
                const inParams = [];
                inParams.push(query || []);
                const params = [];
                params.push(inParams);
                odoo.execute_kw(model, IOdooRpc_1.OdooOperation.searchCount, params, function (err, value) {
                    if (err) {
                        error(err);
                        return;
                    }
                    self.logger.info("count completed on %s with %s elements", model, value);
                    success(value);
                });
            });
        })
            .catch(function (err) {
            self.logger.error(err);
            throw new Error(err);
        })
            .then(res => {
            const t = new OdooCountResult_1.OdooCountResult();
            t.company = OdooRpc_1.fromOdooCompany(company);
            t.count = +res;
            return t;
        });
    }
    /**
     * Get default company from configuration
     * @returns {OdooCompany}
     */
    getDefaultCompany() {
        return _.find(this.config.companies, { "isDefault": true });
    }
    /**
     * Search items from odoo from N with batch size of limit
     * @param {OdooCompany | OdooCompany[]} company
     * @param model
     * @param {Array} query
     * @param {Array} fields
     * @param {number} from
     * @param {number} limit
     * @returns {Promise<OdooSearchResult[]>}
     */
    searchRead(company, model, query = [], fields = [], from = 0, limit = null) {
        if (company === undefined || company === null) {
            company = this.getDefaultCompany();
        }
        if (!Array.isArray(company)) {
            company = [company];
        }
        // promise all
        return Promise.all(company.map(c => this.searchReadOneCompany(c, model, query, fields, from, limit)));
    }
    /**
     * Get count of something from Odoo
     * @returns {Promise<any>}
     */
    count(company, model, query = []) {
        if (company === undefined || company === null) {
            company = this.getDefaultCompany();
        }
        if (!Array.isArray(company)) {
            company = [company];
        }
        // promise all
        return Promise.all(company.map(c => this.countOneCompany(c, model, query)));
    }
    /**
     * Search read in one or more companies, with a prior Count
     * This function is optimize to search in multi companies (parallel requests)
     * @returns {Promise<OdooSearchResult[]>}
     */
    searchReadWithCount(company, model, query = [], fields = [], from = 0, limit = null) {
        if (limit == null) {
            limit = this.xmlRpcConfig.defaultLimit;
        }
        if (company === undefined || company === null) {
            company = this.getDefaultCompany();
        }
        if (!Array.isArray(company)) {
            company = [company];
        }
        const self = this;
        // promise all
        return Promise.all(company.map(c => this.searchWithCountOneCompany(c, model, query, fields, from, limit)));
    }
    /**
     * Search items from odoo with parallel request from N with a maximum of max items
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @param {Array} fields
     * @param {number} from
     * @param {number} max  if max == 0 search all items from From
     * @returns {Promise<OdooSearchResult>}
     */
    searchWithCountOneCompany(company, model, query = [], fields = [], from = 0, max = 0) {
        const self = this;
        return this.countOneCompany(company, model, query)
            .then(countResult => {
            countResult.count -= from;
            if (max > 0 && max < countResult.count) {
                countResult.count = max;
            }
            const limits = self.getNbPromises(countResult.count);
            // start all promises and merge responses
            const promises = [];
            for (let i = 0; i < limits.nbPromises; i++) {
                promises.push(self.searchReadOneCompany(company, model, query, fields, from + (i * limits.limitPerPromise), limits.limitPerPromise));
            }
            return promises;
        })
            .then(promises => {
            return Promise.all(promises)
                .then(results => {
                // merge all results items
                const t = new OdooSearchResult_1.OdooSearchResult();
                t.company = OdooRpc_1.fromOdooCompany(company);
                t.items = [];
                _.each(results, r => {
                    t.items = t.items.concat(r.items);
                });
                return t;
            });
        });
    }
    /**
     * Get Number of promises and limit per promise based on a result Count
     * @param {number} count
     * @returns {{nbPromises: number; limitPerPromise: number}}
     */
    getNbPromises(count) {
        let nbPromises = this.xmlRpcConfig.maxConcurrentCalls;
        let limitPerPromise = Math.ceil(count / nbPromises);
        if (limitPerPromise < this.xmlRpcConfig.concurrentCallsLowLimitThreshold) {
            // to low per bucket, find a number of promises where number is at least low threshold
            nbPromises = Math.ceil(count / this.xmlRpcConfig.concurrentCallsLowLimitThreshold);
            limitPerPromise = this.xmlRpcConfig.concurrentCallsLowLimitThreshold;
        }
        return { nbPromises, limitPerPromise };
    }
    /**
     * Translate OdooCompany into an simple Company to remove authentication information
     * @param {OdooCompany} odooCompany
     * @returns {Company}
     */
    static fromOdooCompany(odooCompany) {
        const company = new Company_1.Company();
        company.id = odooCompany.id;
        company.name = odooCompany.name;
        return company;
    }
    /**
     * Read operation
     * @param {OdooCompany | OdooCompany[]} company
     * @param model
     * @param {Array} query
     * @param {Array} fields
     * @returns {Promise<OdooSearchResult[]>}
     */
    read(company, model, query = [], fields = []) {
        if (company === undefined || company === null) {
            company = this.getDefaultCompany();
        }
        if (!Array.isArray(company)) {
            company = [company];
        }
        // promise all
        return Promise.all(company.map(c => this.readOneCompany(c, model, query, fields)));
    }
    /**
     * Count number of items on One company
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @param fields
     * @returns {Promise<OdooCountResult>}
     */
    readOneCompany(company, model, query = [], fields = []) {
        const self = this;
        return new Promise(function (success, error) {
            self.getOdooConnection(company)
                .then(odoo => {
                const inParams = [];
                inParams.push(query || []);
                inParams.push(fields || []);
                const params = [];
                params.push(inParams);
                odoo.execute_kw(model, IOdooRpc_1.OdooOperation.read, params, function (err, value) {
                    if (err) {
                        error(err);
                        return;
                    }
                    self.logger.info("count completed on %s with %s elements", model, value);
                    success(value);
                });
            });
        })
            .catch(function (err) {
            self.logger.error(err);
            throw new Error(err);
        })
            .then(res => {
            const t = new OdooSearchResult_1.OdooSearchResult();
            t.company = OdooRpc_1.fromOdooCompany(company);
            t.items = [res];
            return t;
        });
    }
};
__decorate([
    inversify_1.inject(ILogger_1.ILogger),
    __metadata("design:type", ILogger_1.ILogger)
], OdooRpc.prototype, "logger", void 0);
__decorate([
    inversify_1.inject(OdooConfiguration_1.OdooConfiguration),
    __metadata("design:type", OdooConfiguration_1.OdooConfiguration)
], OdooRpc.prototype, "config", void 0);
__decorate([
    inversify_1.inject(OdooXmlRpcConfiguration_1.OdooXmlRpcConfiguration),
    __metadata("design:type", OdooXmlRpcConfiguration_1.OdooXmlRpcConfiguration)
], OdooRpc.prototype, "xmlRpcConfig", void 0);
OdooRpc = OdooRpc_1 = __decorate([
    inversify_1.injectable()
], OdooRpc);
exports.OdooRpc = OdooRpc;
var OdooRpc_1;
//# sourceMappingURL=OdooRpc.js.map