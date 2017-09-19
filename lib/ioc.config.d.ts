import "reflect-metadata";
import { OdooConfiguration } from "./Config/OdooConfiguration";
import { ILogger } from "./Logger/ILogger";
import { Odoo } from "./Odoo";
export declare class OdooIoCConfig {
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
