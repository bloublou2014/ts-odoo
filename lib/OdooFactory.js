"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OdooIoCConfig_1 = require("./OdooIoCConfig");
class OdooFactory {
    /**
     * Generate an Odoo class based on configuration
     * @param {OdooConfiguration} configuration
     * @param {ILogger} logger
     * @returns {Odoo}
     */
    static createOdoo(configuration, logger) {
        const odooIoC = new OdooIoCConfig_1.OdooIoCConfig();
        odooIoC.init(configuration, logger);
        return odooIoC.getOdoo();
    }
}
exports.OdooFactory = OdooFactory;
//# sourceMappingURL=OdooFactory.js.map