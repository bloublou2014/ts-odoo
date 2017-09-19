import {OdooConfiguration} from "./Config/OdooConfiguration";
import {ILogger} from "./Logger/ILogger";
import {OdooIoCConfig} from "./OdooIoCConfig";
import {Odoo} from "./Odoo";

export class OdooFactory {
    /**
     * Generate an Odoo class based on configuration
     * @param {OdooConfiguration} configuration
     * @param {ILogger} logger
     * @returns {Odoo}
     */
    public static createOdoo(configuration: OdooConfiguration, logger?: ILogger): Odoo {
        const odooIoC = new OdooIoCConfig();
        odooIoC.init(configuration, logger);
        return odooIoC.getOdoo();
    }
}