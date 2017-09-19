import "reflect-metadata";
import {Container} from "inversify";
import {OdooConfiguration} from "./Config/OdooConfiguration";

import * as bunyan from "bunyan";
import {ILogger} from "./Logger/ILogger";
import {OdooInventory} from "./API/OdooInventory";
import {Odoo} from "./Odoo";
import {OdooEmployees} from "./API/OdooEmployees";
import {OdooXmlRpcConfiguration} from "./Config/OdooXmlRpcConfiguration";
import {OdooModel} from "./API/OdooModel";
import {OdooRpc} from "./RPC/OdooRpc";

export class OdooIoCConfig {

    private container: Container;

    /**
     * Init container
     */
    public init(configuration?: OdooConfiguration, logger ?: ILogger) {
        const container: Container = new Container();
        this.container = container;

        // bind itself
        container.bind<Container>(Container).toConstantValue(container);
        this.setupConfiguration(configuration);

        // logger
        const loggerInstance = logger !== null ? logger : OdooIoCConfig.getDefaultLogger();
        container.bind<ILogger>(ILogger).toConstantValue(loggerInstance);

        // components
        this.setupComponents();

        container.bind<Odoo>(Odoo).toSelf().inTransientScope();
        return container.get(Odoo);
    }

    /**
     * Generate logger based on configuration
     * @returns {ILogger}
     */
    protected static getDefaultLogger(): ILogger {
        return bunyan.createLogger({name: "ts-odoo"});
    }

    public static setupExternalContainer(current: Container, ext: Container) {
        ext.bind<OdooModel>(OdooModel).toConstantValue(current.get(OdooModel));
        ext.bind<OdooInventory>(OdooInventory).toConstantValue(current.get(OdooInventory));
        ext.bind<OdooEmployees>(OdooEmployees).toConstantValue(current.get(OdooEmployees));
    }

    protected setupComponents() {
        this.container.bind<OdooRpc>(OdooRpc).toSelf().inSingletonScope();
        this.container.bind<OdooModel>(OdooModel).toSelf().inSingletonScope();
        this.container.bind<OdooInventory>(OdooInventory).toSelf().inSingletonScope();
        this.container.bind<OdooEmployees>(OdooEmployees).toSelf().inSingletonScope();
        //this.container.bind<OdooContacts>(OdooContacts).toSelf().inSingletonScope();
    }

    protected setupConfiguration(configuration?: OdooConfiguration) {
        // bind configuration
        this.container.bind<OdooConfiguration>(OdooConfiguration).toConstantValue(configuration);
        this.container.bind<OdooXmlRpcConfiguration>(OdooXmlRpcConfiguration).toConstantValue(configuration.applications.xmlRpc);
    }

    public getOdoo(): Odoo {
        return this.container.get(Odoo);
    }

}
