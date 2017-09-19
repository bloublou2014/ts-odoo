export declare class OdooXmlRpcConfiguration {
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
