"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OdooXmlRpcConfiguration {
    constructor() {
        /**
         * Enable/Disable cache to reuse Odoo connection
         * @type {boolean}
         */
        this.cache = true;
        /**
         * Connection timeout (ms) : Odoo connections will be reused during at most xx ms
         * @type {number}
         */
        this.connectionCacheTimeoutMs = 30 * 1000;
        /**
         * Enable concurrent read everywhere if multiple companies are configured
         * @type {boolean}
         */
        this.enableMultiCompanyConcurrentRead = true;
        /**
         * Does odoo url starts with https://
         * @type {boolean}
         */
        this.odooUrlHttps = true;
        /**
         * End of url
         * @type {string}
         */
        this.odooUrl = ".odoo.com";
        /**
         * Default limit per search request if not provided
         * @type {number}
         */
        this.defaultLimit = 1000;
        /**
         * Maximum number of concurrent calls per search_read on a company
         * @type {number}
         */
        this.maxConcurrentCalls = 5;
        /**
         * Minimum number of item to retrieve in parallel to trigger a new concurrent call
         * @type {number}
         */
        this.concurrentCallsLowLimitThreshold = 500;
    }
}
exports.OdooXmlRpcConfiguration = OdooXmlRpcConfiguration;
