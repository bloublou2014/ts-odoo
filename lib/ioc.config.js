"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const OdooConfiguration_1 = require("./Config/OdooConfiguration");
const bunyan = require("bunyan");
const ILogger_1 = require("./Logger/ILogger");
const OdooInventory_1 = require("./API/OdooInventory");
const Odoo_1 = require("./Odoo");
const OdooEmployees_1 = require("./API/OdooEmployees");
const OdooXmlRpcConfiguration_1 = require("./Config/OdooXmlRpcConfiguration");
const OdooModel_1 = require("./API/OdooModel");
class OdooIoCConfig {
    /**
     * Init container
     */
    init(configuration, logger) {
        const container = new inversify_1.Container();
        this.container = container;
        // bind itself
        container.bind(inversify_1.Container).toConstantValue(container);
        this.setupConfiguration(configuration);
        // logger
        const loggerInstance = logger !== null ? logger : OdooIoCConfig.getDefaultLogger();
        container.bind(ILogger_1.ILogger).toConstantValue(loggerInstance);
        // components
        this.setupComponents();
        container.bind(Odoo_1.Odoo).toSelf().inTransientScope();
        return container.get(Odoo_1.Odoo);
    }
    /**
     * Generate logger based on configuration
     * @returns {ILogger}
     */
    static getDefaultLogger() {
        return bunyan.createLogger({ name: "ts-odoo" });
    }
    setupComponents() {
        this.container.bind(OdooModel_1.OdooModel).toSelf().inSingletonScope();
        this.container.bind(OdooInventory_1.OdooInventory).toSelf().inSingletonScope();
        this.container.bind(OdooEmployees_1.OdooEmployees).toSelf().inSingletonScope();
        //this.container.bind<OdooContacts>(OdooContacts).toSelf().inSingletonScope();
        //this.container.bind<OdooRpc>(OdooRpc).toSelf().inSingletonScope();
    }
    setupConfiguration(configuration) {
        // bind configuration
        this.container.bind(OdooConfiguration_1.OdooConfiguration).toConstantValue(configuration);
        this.container.bind(OdooXmlRpcConfiguration_1.OdooXmlRpcConfiguration).toConstantValue(configuration.applications.xmlRpc);
    }
}
exports.OdooIoCConfig = OdooIoCConfig;
//# sourceMappingURL=ioc.config.js.map