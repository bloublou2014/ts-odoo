import { Category } from "./Entities/Products/Category";
import { Company } from "./Entities/Common/Company";
import { Employee } from "./Entities/Employees/Employee";
import { InventoryAdjustment } from "./Entities/Inventory/InventoryAdjustment";
import { Location } from "./Entities/Inventory/Location";
import { Product } from "./Entities/Products/Product";
import { Quant } from "./Entities/Inventory/Quant";
import { Serial } from "./Entities/Inventory/Serial";
import { Warehouse } from "./Entities/Inventory/Warehouse";
import { OdooInventory } from "./API/OdooInventory";
import { OdooModel } from "./API/OdooModel";
import { OdooEmployees } from "./API/OdooEmployees";
import { Odoo } from "./Odoo";
import { OdooFactory } from "./OdooFactory";
import { OdooConfiguration } from "./Config/OdooConfiguration";
import { OdooCompany } from "./Config/OdooCompany";
declare const Entities: {
    Category: typeof Category;
    Company: typeof Company;
    Employee: typeof Employee;
    InventoryAdjustment: typeof InventoryAdjustment;
    Location: typeof Location;
    Product: typeof Product;
    Quant: typeof Quant;
    Serial: typeof Serial;
    Warehouse: typeof Warehouse;
};
declare const Api: {
    OdooModel: typeof OdooModel;
    OdooInventory: typeof OdooInventory;
    OdooEmployees: typeof OdooEmployees;
};
declare const Config: {
    OdooConfiguration: typeof OdooConfiguration;
    OdooCompany: typeof OdooCompany;
};
export { Api, Config, Entities, Odoo, OdooFactory };
