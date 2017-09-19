"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_config_1 = require("./ioc.config");
class OdooFactory {
    /**
     * Generate an Odoo class based on configuration
     * @param {OdooConfiguration} configuration
     * @param {ILogger} logger
     * @returns {Odoo}
     */
    static createOdoo(configuration, logger) {
        const odooIoC = new ioc_config_1.OdooIoCConfig();
        return odooIoC.init(configuration, logger);
    }
}
exports.OdooFactory = OdooFactory;
