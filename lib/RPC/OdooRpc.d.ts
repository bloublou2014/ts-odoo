import { ILogger } from "../Logger/ILogger";
import { OdooConfiguration } from "../Config/OdooConfiguration";
import { OdooCompany } from "../Config/OdooCompany";
import { OdooSearchResult } from "./OdooSearchResult";
import { Company } from "../Entities/Common/Company";
import { OdooCountResult } from "./OdooCountResult";
import { OdooXmlRpcConfiguration } from "../Config/OdooXmlRpcConfiguration";
import { IOdooRpc } from "./IOdooRpc";
import { OdooXmlRpc } from "./OdooXmlRpc";
export declare class OdooRpc implements IOdooRpc {
    logger: ILogger;
    protected config: OdooConfiguration;
    protected xmlRpcConfig: OdooXmlRpcConfiguration;
    protected connectionCache: any;
    /**
     * Create and Get
     * @returns any
     */
    protected getCache(): any;
    /**
     * Get connection from Cache
     * @param {OdooCompany} company
     * @returns {}
     */
    protected getCachedConnection(company: OdooCompany): Promise<OdooXmlRpc>;
    /**
     * Set connection to cache
     * @param {OdooCompany} company
     * @param {} odoo
     */
    protected setCachedConnection(company: OdooCompany, odoo: OdooXmlRpc): any;
    /**
     * Get an XML RPC connection to Odoo (odoo-xmlrpc)
     * @param {OdooCompany} company
     * @returns {Promise<>}
     */
    getOdooConnection(company: OdooCompany): Promise<OdooXmlRpc>;
    /**
     * Provide Odoo URL based on configuration
     * @returns {string}
     */
    protected getOdooUrl(): string;
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
    searchReadOneCompany(company: OdooCompany, model: any, query?: any[], fields?: any[], from?: number, limit?: number): Promise<OdooSearchResult>;
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
    protected searchOneIncremental(odoo: OdooXmlRpc, model: string, query?: any[], fields?: any[], from?: number, limit?: number): Promise<any>;
    /**
     * Count number of items on One company
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @returns {Promise<OdooCountResult>}
     */
    countOneCompany(company: OdooCompany, model: any, query?: any[]): Promise<OdooCountResult>;
    /**
     * Get default company from configuration
     * @returns {OdooCompany}
     */
    getDefaultCompany(): OdooCompany;
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
    searchRead(company: OdooCompany | OdooCompany[], model: any, query?: any[], fields?: any[], from?: number, limit?: any): Promise<OdooSearchResult[]>;
    /**
     * Get count of something from Odoo
     * @returns {Promise<OdooCountResult>}
     */
    count(company: OdooCompany | OdooCompany[], model: any, query?: any[]): Promise<OdooCountResult[]>;
    /**
     * Search read in one or more companies, with a prior Count
     * This function is optimize to search in multi companies (parallel requests)
     * @returns {Promise<OdooSearchResult[]>}
     */
    searchReadWithCount(company: OdooCompany | OdooCompany[] | null, model: any, query?: any[], fields?: any[], from?: number, limit?: any): Promise<OdooSearchResult[]>;
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
    protected searchWithCountOneCompany(company: OdooCompany, model: any, query?: any[], fields?: any[], from?: number, max?: number): Promise<OdooSearchResult>;
    /**
     * Get Number of promises and limit per promise based on a result Count
     * @param {number} count
     * @returns {nbPromises: number; limitPerPromise: number}
     */
    protected getNbPromises(count: number): {
        nbPromises: number;
        limitPerPromise: number;
    };
    /**
     * Translate OdooCompany into an simple Company to remove authentication information
     * @param {OdooCompany} odooCompany
     * @returns {Company}
     */
    protected static fromOdooCompany(odooCompany: OdooCompany): Company;
    /**
     * Read operation
     * @param {OdooCompany | OdooCompany[]} company
     * @param model
     * @param {Array} query
     * @param {Array} fields
     * @returns {Promise<OdooSearchResult[]>}
     */
    read(company: OdooCompany | OdooCompany[], model: any, query?: any[], fields?: any[]): Promise<OdooSearchResult[]>;
    /**
     * Count number of items on One company
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @param fields
     * @returns {Promise<OdooCountResult>}
     */
    readOneCompany(company: OdooCompany, model: any, query?: any[], fields?: any[]): Promise<OdooSearchResult>;
}
