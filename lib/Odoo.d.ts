import { Container } from "inversify";
import { OdooInventory } from "./API/OdooInventory";
import { OdooEmployees } from "./API/OdooEmployees";
import { OdooModel } from "./API/OdooModel";
export declare class Odoo {
    protected container: Container;
    getModel(): OdooModel;
    /**
     * Get Odoo inventory System
     * @returns {OdooInventory}
     */
    getInventory(): OdooInventory;
    getEmployees(): OdooEmployees;
    /**
     * setup available modules to Inversify IOC Container
     * @param {Container} container
     */
    setupInversify(container: Container): void;
}
