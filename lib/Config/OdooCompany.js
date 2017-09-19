"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Odoo Company Login information
 * Since Odoo can manage multiple companies each one should be describe here
 * In some case Odoo modules can be configured as common for all companies, in that case
 * default company can be used.
 */
class OdooCompany {
    constructor() {
        /**
         * Define defaut Company, if there's is only one defined company, it will be the default one
         */
        this.isDefault = false;
    }
}
exports.OdooCompany = OdooCompany;
//# sourceMappingURL=OdooCompany.js.map