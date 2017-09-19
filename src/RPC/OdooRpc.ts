import {inject, injectable} from "inversify";

import * as  OdooXmlRpc from "odoo-xmlrpc";
import * as _ from "lodash";
import {ILogger} from "../Logger/ILogger";
import {OdooConfiguration} from "../Config/OdooConfiguration";
import {OdooCompany} from "../Config/OdooCompany";
import {OdooSearchResult} from "./OdooSearchResult";
import {Company} from "../Entities/Common/Company";
import {OdooCountResult} from "./OdooCountResult";
import {OdooXmlRpcConfiguration} from "../Config/OdooXmlRpcConfiguration";
import {IOdooRpc, OdooOperation} from "./IOdooRpc";

const CacheClass = require("memory-cache").Cache;


@injectable()
export class OdooRpc implements IOdooRpc {

    @inject(ILogger)
    public logger: ILogger;

    @inject(OdooConfiguration)
    protected config: OdooConfiguration;

    @inject(OdooXmlRpcConfiguration)
    protected xmlRpcConfig: OdooXmlRpcConfiguration;

    protected connectionCache;

    // region Cache

    /**
     * Create and Get
     * @returns {any}
     */
    protected getCache(): any {
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
    protected getCachedConnection(company: OdooCompany): OdooXmlRpc {
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
    protected setCachedConnection(company: OdooCompany, odoo: OdooXmlRpc) {
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
    public getOdooConnection(company: OdooCompany): Promise<OdooXmlRpc> {
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
    protected getOdooUrl(): string {
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
    public searchReadOneCompany(company: OdooCompany, model, query = [], fields = [], from = 0, limit: number = null): Promise<OdooSearchResult> {
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
                const t = new OdooSearchResult();
                t.company = OdooRpc.fromOdooCompany(company);
                t.items = res as any;
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
    protected searchOneIncremental(odoo: OdooXmlRpc, model: string, query = [], fields = [], from = 0, limit: number = null) {
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
            odoo.execute_kw(model, OdooOperation.searchRead, params,
                function (err, value) {
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
    public countOneCompany(company: OdooCompany, model, query = []): Promise<OdooCountResult> {
        const self = this;
        return new Promise(function (success, error) {
            self.getOdooConnection(company)
                .then(odoo => {
                    const inParams = [];
                    inParams.push(query || []);

                    const params = [];
                    params.push(inParams);
                    odoo.execute_kw(model, OdooOperation.searchCount, params,
                        function (err, value) {
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
                const t = new OdooCountResult();
                t.company = OdooRpc.fromOdooCompany(company);
                t.count = +res;
                return t;
            });
    }

    /**
     * Get default company from configuration
     * @returns {OdooCompany}
     */
    public getDefaultCompany(): OdooCompany {
        return _.find(this.config.companies, {"isDefault": true});
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
    public searchRead(company: OdooCompany | OdooCompany[], model, query = [], fields = [], from = 0, limit = null): Promise<OdooSearchResult[]> {
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
    public count(company: OdooCompany | OdooCompany[], model, query = []): Promise<OdooCountResult[]> {
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
    public searchReadWithCount(company: OdooCompany | OdooCompany[] | null, model, query = [], fields = [], from = 0, limit = null): Promise<OdooSearchResult[]> {
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
    protected searchWithCountOneCompany(company: OdooCompany, model, query = [], fields = [], from = 0, max = 0): Promise<OdooSearchResult> {
        const self = this;
        return this.countOneCompany(company, model, query)
            .then(countResult => {
                countResult.count -= from;
                if (max > 0 && max < countResult.count) {
                    countResult.count = max;
                }

                const limits = self.getNbPromises(countResult.count);
                // start all promises and merge responses
                const promises: Promise<OdooSearchResult>[] = [];
                for (let i = 0; i < limits.nbPromises; i++) {
                    promises.push(self.searchReadOneCompany(company, model, query, fields,
                        from + (i * limits.limitPerPromise),
                        limits.limitPerPromise));
                }
                return promises;
            })
            .then(promises => {
                return Promise.all(promises)
                    .then(results => {
                        // merge all results items
                        const t = new OdooSearchResult();
                        t.company = OdooRpc.fromOdooCompany(company);
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
    protected getNbPromises(count: number) {
        let nbPromises = this.xmlRpcConfig.maxConcurrentCalls;
        let limitPerPromise = Math.ceil(count / nbPromises);
        if (limitPerPromise < this.xmlRpcConfig.concurrentCallsLowLimitThreshold) {
            // to low per bucket, find a number of promises where number is at least low threshold
            nbPromises = Math.ceil(count / this.xmlRpcConfig.concurrentCallsLowLimitThreshold);
            limitPerPromise = this.xmlRpcConfig.concurrentCallsLowLimitThreshold;
        }
        return {nbPromises, limitPerPromise};
    }

    /**
     * Translate OdooCompany into an simple Company to remove authentication information
     * @param {OdooCompany} odooCompany
     * @returns {Company}
     */
    protected static fromOdooCompany(odooCompany: OdooCompany): Company {
        const company = new Company();
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
    public read(company: OdooCompany | OdooCompany[], model, query = [], fields = []): Promise<OdooSearchResult[]> {
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
    public readOneCompany(company: OdooCompany, model, query = [], fields = []): Promise<OdooSearchResult> {
        const self = this;
        return new Promise(function (success, error) {
            self.getOdooConnection(company)
                .then(odoo => {
                    const inParams = [];
                    inParams.push(query || []);
                    inParams.push(fields || []);

                    const params = [];
                    params.push(inParams);
                    odoo.execute_kw(model, OdooOperation.read, params,
                        function (err, value) {
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
                const t = new OdooSearchResult();
                t.company = OdooRpc.fromOdooCompany(company);
                t.items = [res];
                return t;
            });
    }

    // endregion
}
