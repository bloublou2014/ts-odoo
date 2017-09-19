declare module 'ts-odoo/Entities/Products/Category' {
	export class Category {
	    id: number;
	    name: string;
	    display_name: string;
	    parent_id: number;
	    parent_display_name: string;
	}

}
declare module 'ts-odoo/Entities/Common/Company' {
	/**
	 * Company definition for results
	 * Not an actual Odoo Company as per Odoo Model
	 */
	export class Company {
	    name: string;
	    id: number;
	}

}
declare module 'ts-odoo/Entities/Employees/Employee' {
	export class Employee {
	    id: number;
	    work_phone: string;
	    work_email: string;
	    company_id: number;
	    company_display_name: string;
	    department_id: number;
	    department_display_name: string;
	    job_id: number;
	    job_display_name: string;
	    parent_id: number;
	    parent_display_name: string;
	    coach_id: number;
	    coach_display_name: string;
	}

}
declare module 'ts-odoo/Entities/Inventory/InventoryAdjustment' {
	export class InventoryAdjustment {
	    id: number;
	    name: string;
	    display_name: string;
	    filter: string;
	    move_ids: number[];
	    state: string;
	    date: Date;
	    accounting_date: Date;
	    last_update: Date;
	    line_ids: number[];
	    company_id: number;
	    company_display_name: string;
	    location_id: number;
	    location_display_name: string;
	    partner_id: number;
	    partner_display_name: string;
	    product_id: number;
	    product_display_name: string;
	    package_id: number;
	    package_display_name: string;
	    lot_id: number;
	    lot_display_name: string;
	}

}
declare module 'ts-odoo/Entities/Inventory/Location' {
	export class Location {
	    id: number;
	    active: boolean;
	    name: string;
	    display_name: string;
	    barcode: string;
	    company_id: number;
	    company_display_name: string;
	    location_id: number;
	    location_display_name: string;
	    partner_id: number;
	    partner_display_name: string;
	}

}
declare module 'ts-odoo/Entities/Products/Product' {
	export class Product {
	    id: number;
	    name: string;
	    type: string;
	    default_code: string;
	    barcode: string;
	    tracking: string;
	    categ_id: number;
	    categ_display_name: string;
	    product_tmpl_id: number;
	    product_tmpl_display_name: string;
	    is_valid_name: boolean;
	    manufacturer: string;
	    part_number: string;
	    description: string;
	}

}
declare module 'ts-odoo/Entities/Inventory/Quant' {
	export class Quant {
	    id: number;
	    name: string;
	    display_name: string;
	    qty: number;
	    history_ids: any[];
	    company_id: number;
	    company_display_name: string;
	    location_id: number;
	    location_display_name: string;
	    reservation_id: number;
	    reservation_display_name: string;
	}

}
declare module 'ts-odoo/Entities/Inventory/Serial' {
	import { Quant } from 'ts-odoo/Entities/Inventory/Quant';
	export class Serial {
	    id: number;
	    name: string;
	    display_name: string;
	    ref: string;
	    stock_available: number;
	    create_date: string;
	    product_id: number;
	    product_display_name: string;
	    quant: Quant;
	}

}
declare module 'ts-odoo/Entities/Inventory/Warehouse' {
	export class Warehouse {
	    id: number;
	    code: string;
	    active: boolean;
	    name: string;
	    display_name: string;
	    company_id: number;
	    company_display_name: string;
	    lot_stock_id: number;
	    lot_stock_display_name: string;
	}

}
declare module 'ts-odoo/Logger/ILogger' {
	import "reflect-metadata";
	export abstract class ILogger {
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    trace(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    trace(obj: Object, ...params: any[]): void;
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    debug(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    debug(obj: Object, ...params: any[]): void;
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    info(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    info(obj: Object, ...params: any[]): void;
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    warn(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    warn(obj: Object, ...params: any[]): void;
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    error(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    error(obj: Object, ...params: any[]): void;
	    /**
	     * Special case to log an `Error` instance to the record.
	     * This adds an `err` field with exception details
	     * (including the stack) and sets `msg` to the exception
	     * message or you can specify the `msg`.
	     */
	    fatal(error: Error, ...params: any[]): void;
	    /**
	     * The first field can optionally be a "fields" object, which
	     * is merged into the log record.
	     *
	     * To pass in an Error *and* other fields, use the `err`
	     * field name for the Error instance.
	     */
	    fatal(obj: Object, ...params: any[]): void;
	}

}
declare module 'ts-odoo/Config/OdooCompany' {
	/**
	 * Odoo Company Login information
	 * Since Odoo can manage multiple companies each one should be describe here
	 * In some case Odoo modules can be configured as common for all companies, in that case
	 * default company can be used.
	 */
	export class OdooCompany {
	    /**
	     * Define defaut Company, if there's is only one defined company, it will be the default one
	     */
	    isDefault: boolean;
	    /**
	     * Company id must match Odoo company id
	     */
	    id: number;
	    /**
	     * Name is for internal use and does not requires to be the exact Odoo company
	     */
	    name: string;
	    /**
	     * email used to login to Odoo
	     */
	    username: string;
	    password: string;
	}

}
declare module 'ts-odoo/Config/OdooInventoryConfiguration' {
	export class OdooInventoryConfiguration {
	    /**
	     * Sub category Id to limit warehouse product to a specific sub sections
	     * Avoid showing all companies products for inventory system
	     */
	    warehouseCategoryId: number;
	}

}
declare module 'ts-odoo/Config/OdooXmlRpcConfiguration' {
	export class OdooXmlRpcConfiguration {
	    /**
	     * Enable/Disable cache to reuse Odoo connection
	     * @type {boolean}
	     */
	    cache: boolean;
	    /**
	     * Connection timeout (ms) : Odoo connections will be reused during at most xx ms
	     * @type {number}
	     */
	    connectionCacheTimeoutMs: number;
	    /**
	     * Enable concurrent read everywhere if multiple companies are configured
	     * @type {boolean}
	     */
	    enableMultiCompanyConcurrentRead: boolean;
	    /**
	     * Does odoo url starts with https://
	     * @type {boolean}
	     */
	    odooUrlHttps: boolean;
	    /**
	     * End of url
	     * @type {string}
	     */
	    odooUrl: string;
	    /**
	     * Default limit per search request if not provided
	     * @type {number}
	     */
	    defaultLimit: number;
	    /**
	     * Maximum number of concurrent calls per search_read on a company
	     * @type {number}
	     */
	    maxConcurrentCalls: number;
	    /**
	     * Minimum number of item to retrieve in parallel to trigger a new concurrent call
	     * @type {number}
	     */
	    concurrentCallsLowLimitThreshold: number;
	}

}
declare module 'ts-odoo/Config/OdooApplications' {
	import { OdooInventoryConfiguration } from 'ts-odoo/Config/OdooInventoryConfiguration';
	import { OdooXmlRpcConfiguration } from 'ts-odoo/Config/OdooXmlRpcConfiguration';
	export class OdooApplications {
	    inventory: OdooInventoryConfiguration;
	    xmlRpc: OdooXmlRpcConfiguration;
	}

}
declare module 'ts-odoo/Config/OdooConfiguration' {
	import { OdooCompany } from 'ts-odoo/Config/OdooCompany';
	import { OdooApplications } from 'ts-odoo/Config/OdooApplications';
	export class OdooConfiguration {
	    /**
	     * Odoo database name
	     */
	    database: string;
	    companies: OdooCompany[];
	    applications: OdooApplications;
	}

}
declare module 'ts-odoo/RPC/OdooSearchResult' {
	import { Company } from 'ts-odoo/Entities/Common/Company';
	export class OdooSearchResult {
	    /**
	     * Requested Company
	     */
	    company: Company;
	    /**
	     * Results
	     */
	    items: any[];
	}

}
declare module 'ts-odoo/RPC/OdooCountResult' {
	import { Company } from 'ts-odoo/Entities/Common/Company';
	export class OdooCountResult {
	    /**
	     * Requested Company
	     */
	    company: Company;
	    /**
	     * Number of results
	     */
	    count: number;
	}

}
declare module 'ts-odoo/RPC/IOdooRpc' {
	import * as OdooXmlRpc from "odoo-xmlrpc";
	import { OdooCompany } from 'ts-odoo/Config/OdooCompany';
	import { OdooSearchResult } from 'ts-odoo/RPC/OdooSearchResult';
	import { OdooCountResult } from 'ts-odoo/RPC/OdooCountResult';
	export enum OdooOperation {
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

}
declare module 'ts-odoo/RPC/OdooRpc' {
	import * as OdooXmlRpc from "odoo-xmlrpc";
	import { ILogger } from 'ts-odoo/Logger/ILogger';
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { OdooCompany } from 'ts-odoo/Config/OdooCompany';
	import { OdooSearchResult } from 'ts-odoo/RPC/OdooSearchResult';
	import { Company } from 'ts-odoo/Entities/Common/Company';
	import { OdooCountResult } from 'ts-odoo/RPC/OdooCountResult';
	import { OdooXmlRpcConfiguration } from 'ts-odoo/Config/OdooXmlRpcConfiguration';
	import { IOdooRpc } from 'ts-odoo/RPC/IOdooRpc';
	export class OdooRpc implements IOdooRpc {
	    logger: ILogger;
	    protected config: OdooConfiguration;
	    protected xmlRpcConfig: OdooXmlRpcConfiguration;
	    protected connectionCache: any;
	    /**
	     * Create and Get
	     * @returns {any}
	     */
	    protected getCache(): any;
	    /**
	     * Get connection from Cache
	     * @param {OdooCompany} company
	     * @returns {}
	     */
	    protected getCachedConnection(company: OdooCompany): OdooXmlRpc;
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
	    protected searchOneIncremental(odoo: OdooXmlRpc, model: string, query?: any[], fields?: any[], from?: number, limit?: number): Promise<{}>;
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
	     * @returns {Promise<any>}
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
	     * @returns {{nbPromises: number; limitPerPromise: number}}
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

}
declare module 'ts-odoo/API/OdooInventory' {
	import { ILogger } from 'ts-odoo/Logger/ILogger';
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { OdooRpc } from 'ts-odoo/RPC/OdooRpc';
	export class OdooInventory {
	    protected logger: ILogger;
	    protected config: OdooConfiguration;
	    protected odoo: OdooRpc;
	}

}
declare module 'ts-odoo/Entities/Common/IrModel' {
	export class IrModel {
	}

}
declare module 'ts-odoo/API/OdooModel' {
	import { ILogger } from 'ts-odoo/Logger/ILogger';
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { OdooRpc } from 'ts-odoo/RPC/OdooRpc';
	import { OdooSearchResult } from 'ts-odoo/RPC/OdooSearchResult';
	export class OdooModel {
	    protected logger: ILogger;
	    protected config: OdooConfiguration;
	    protected odoo: OdooRpc;
	    protected model: string;
	    protected fields: any[];
	    getModels(query?: any[], fields?: any[]): Promise<OdooSearchResult[]>;
	}

}
declare module 'ts-odoo/API/OdooEmployees' {
	export class OdooEmployees {
	}

}
declare module 'ts-odoo/Odoo' {
	import { Container } from "inversify";
	import { OdooInventory } from 'ts-odoo/API/OdooInventory';
	import { OdooEmployees } from 'ts-odoo/API/OdooEmployees';
	import { OdooModel } from 'ts-odoo/API/OdooModel';
	export class Odoo {
	    protected container: Container;
	    getModel(): OdooModel;
	    /**
	     * Get Odoo inventory System
	     * @returns {OdooInventory}
	     */
	    getInventory(): OdooInventory;
	    getEmployees(): OdooEmployees;
	}

}
declare module 'ts-odoo/ioc.config' {
	import "reflect-metadata";
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { ILogger } from 'ts-odoo/Logger/ILogger';
	import { Odoo } from 'ts-odoo/Odoo';
	export class OdooIoCConfig {
	    private container;
	    /**
	     * Init container
	     */
	    init(configuration?: OdooConfiguration, logger?: ILogger): Odoo;
	    /**
	     * Generate logger based on configuration
	     * @returns {ILogger}
	     */
	    protected static getDefaultLogger(): ILogger;
	    protected setupComponents(): void;
	    protected setupConfiguration(configuration?: OdooConfiguration): void;
	}

}
declare module 'ts-odoo/OdooFactory' {
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { ILogger } from 'ts-odoo/Logger/ILogger';
	import { Odoo } from 'ts-odoo/Odoo';
	export class OdooFactory {
	    /**
	     * Generate an Odoo class based on configuration
	     * @param {OdooConfiguration} configuration
	     * @param {ILogger} logger
	     * @returns {Odoo}
	     */
	    static createOdoo(configuration: OdooConfiguration, logger?: ILogger): Odoo;
	}

}
declare module 'ts-odoo/index' {
	import { Category } from 'ts-odoo/Entities/Products/Category';
	import { Company } from 'ts-odoo/Entities/Common/Company';
	import { Employee } from 'ts-odoo/Entities/Employees/Employee';
	import { InventoryAdjustment } from 'ts-odoo/Entities/Inventory/InventoryAdjustment';
	import { Location } from 'ts-odoo/Entities/Inventory/Location';
	import { Product } from 'ts-odoo/Entities/Products/Product';
	import { Quant } from 'ts-odoo/Entities/Inventory/Quant';
	import { Serial } from 'ts-odoo/Entities/Inventory/Serial';
	import { Warehouse } from 'ts-odoo/Entities/Inventory/Warehouse';
	import { OdooModel } from 'ts-odoo/API/OdooModel';
	import { Odoo } from 'ts-odoo/Odoo';
	import { OdooFactory } from 'ts-odoo/OdooFactory';
	import { OdooConfiguration } from 'ts-odoo/Config/OdooConfiguration';
	import { OdooCompany } from 'ts-odoo/Config/OdooCompany'; const Entities: {
	    Category: typeof Category;
	    Company: typeof Company;
	    Employee: typeof Employee;
	    InventoryAdjustment: typeof InventoryAdjustment;
	    Location: typeof Location;
	    Product: typeof Product;
	    Quant: typeof Quant;
	    Serial: typeof Serial;
	    Warehouse: typeof Warehouse;
	}; const Config: {
	    OdooConfiguration: typeof OdooConfiguration;
	    OdooCompany: typeof OdooCompany;
	};
	export { Odoo, OdooFactory, OdooModel, Entities, Config };

}
