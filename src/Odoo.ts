
import {Container, inject, injectable} from "inversify";
import {OdooInventory} from "./API/OdooInventory";
import {OdooEmployees} from "./API/OdooEmployees";
import {OdooModel} from "./API/OdooModel";

@injectable()
export class Odoo {

    @inject(Container)
    protected container: Container;

    public getModel() : OdooModel{
        return this.container.get(OdooModel);
    }

    /**
     * Get Odoo inventory System
     * @returns {OdooInventory}
     */
    public getInventory() : OdooInventory{
        return this.container.get(OdooInventory);
    }

    public getEmployees() : OdooEmployees{
        return this.container.get(OdooEmployees);
    }

}