import * as OdooXmlRpc from "odoo-xmlrpc";
import { OdooCompany } from "../Config/OdooCompany";
import { OdooSearchResult } from "./OdooSearchResult";
import { OdooCountResult } from "./OdooCountResult";
export declare enum OdooOperation {
    read = "read",
    searchRead = "search_read",
    searchCount = "search_count",
}
export interface IOdooRpc {
    /**
     * Get an XML RPC connection to Odoo (odoo-xmlrpc)
     * @param {OdooCompany} company
     * @returns {Promise<>}
     */
    getOdooConnection(company: OdooCompany): Promise<OdooXmlRpc>;
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
    searchReadOneCompany(company: OdooCompany, model: any, query: any, fields: any, from: any, limit: number): Promise<OdooSearchResult>;
    /**
     * Count number of items on One company
     * @param {OdooCompany} company
     * @param model
     * @param {Array} query
     * @returns {Promise<OdooCountResult>}
     */
    countOneCompany(company: OdooCompany, model: any, query: any): Promise<OdooCountResult>;
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
    searchRead(company: OdooCompany | OdooCompany[], model: any, query: any, fields: any, from: any, limit: any): Promise<OdooSearchResult[]>;
    /**
     * Get count of something from Odoo
     * @returns {Promise<any>}
     */
    count(company: OdooCompany | OdooCompany[], model: any, query: any): Promise<OdooCountResult[]>;
    /**
     * Search read in one or more companies, with a prior Count
     * This function is optimize to search in multi companies (parallel requests)
     * @returns {Promise<OdooSearchResult[]>}
     */
    searchReadWithCount(company: OdooCompany | OdooCompany[] | null, model: any, query: any, fields: any, from: any, limit: any): Promise<OdooSearchResult[]>;
}
