import {Container, inject, injectable} from "inversify";
import {OdooInventory} from "./API/OdooInventory";
import {OdooEmployees} from "./API/OdooEmployees";
import {OdooModel} from "./API/OdooModel";
import {OdooIoCConfig} from "./OdooIoCConfig";

@injectable()
export class Odoo {

    @inject(Container)
    protected container: Container;

    public getModel(): OdooModel {
        return this.container.get(OdooModel);
    }

    /**
     * Get Odoo inventory System
     * @returns {OdooInventory}
     */
    public getInventory(): OdooInventory {
        return this.container.get(OdooInventory);
    }

    public getEmployees(): OdooEmployees {
        return this.container.get(OdooEmployees);
    }


    /**
     * setup available modules to Inversify IOC Container
     * @param {Container} container
     */
    public setupInversify(container: Container) {
        OdooIoCConfig.setupExternalContainer(this.container, container);
    }

}