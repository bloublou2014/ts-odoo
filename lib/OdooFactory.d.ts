import { OdooConfiguration } from "./Config/OdooConfiguration";
import { ILogger } from "./Logger/ILogger";
import { Odoo } from "./Odoo";
export declare class OdooFactory {
    /**
     * Generate an Odoo class based on configuration
     * @param {OdooConfiguration} configuration
     * @param {ILogger} logger
     * @returns {Odoo}
     */
    static createOdoo(configuration: OdooConfiguration, logger?: ILogger): Odoo;
}
