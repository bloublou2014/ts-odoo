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
const OdooRpc_1 = require("./RPC/OdooRpc");
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
        const loggerInstance = logger ? logger : OdooIoCConfig.getDefaultLogger();
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
    static setupExternalContainer(current, ext) {
        ext.bind(OdooModel_1.OdooModel).toConstantValue(current.get(OdooModel_1.OdooModel));
        ext.bind(OdooInventory_1.OdooInventory).toConstantValue(current.get(OdooInventory_1.OdooInventory));
        ext.bind(OdooEmployees_1.OdooEmployees).toConstantValue(current.get(OdooEmployees_1.OdooEmployees));
    }
    setupComponents() {
        this.container.bind(OdooRpc_1.OdooRpc).toSelf().inSingletonScope();
        this.container.bind(OdooModel_1.OdooModel).toSelf().inSingletonScope();
        this.container.bind(OdooInventory_1.OdooInventory).toSelf().inSingletonScope();
        this.container.bind(OdooEmployees_1.OdooEmployees).toSelf().inSingletonScope();
        //this.container.bind<OdooContacts>(OdooContacts).toSelf().inSingletonScope();
    }
    setupConfiguration(configuration) {
        // bind configuration
        this.container.bind(OdooConfiguration_1.OdooConfiguration).toConstantValue(configuration);
        this.container.bind(OdooXmlRpcConfiguration_1.OdooXmlRpcConfiguration).toConstantValue(configuration.applications.xmlRpc);
    }
    getOdoo() {
        return this.container.get(Odoo_1.Odoo);
    }
}
exports.OdooIoCConfig = OdooIoCConfig;
//# sourceMappingURL=OdooIoCConfig.js.map