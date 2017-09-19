export class OdooXmlRpcConfiguration {

    /**
     * Enable/Disable cache to reuse Odoo connection
     * @type {boolean}
     */
    public cache: boolean = true;

    /**
     * Connection timeout (ms) : Odoo connections will be reused during at most xx ms
     * @type {number}
     */
    public connectionCacheTimeoutMs: number = 30 * 1000;

    /**
     * Enable concurrent read everywhere if multiple companies are configured
     * @type {boolean}
     */
    public enableMultiCompanyConcurrentRead: boolean = true;

    /**
     * Does odoo url starts with https://
     * @type {boolean}
     */
    public odooUrlHttps: boolean = true;

    /**
     * End of url
     * @type {string}
     */
    public odooUrl: string = ".odoo.com";

    /**
     * Default limit per search request if not provided
     * @type {number}
     */
    public defaultLimit: number = 1000;

    /**
     * Maximum number of concurrent calls per search_read on a company
     * @type {number}
     */
    public maxConcurrentCalls = 5;

    /**
     * Minimum number of item to retrieve in parallel to trigger a new concurrent call
     * @type {number}
     */
    public concurrentCallsLowLimitThreshold = 500;


}