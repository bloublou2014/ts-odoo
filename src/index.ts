import {Category} from "./Entities/Products/Category";
import {Company} from "./Entities/Common/Company";
import {Employee} from "./Entities/Employees/Employee";
import {InventoryAdjustment} from "./Entities/Inventory/InventoryAdjustment";
import {Location} from "./Entities/Inventory/Location";
import {Product} from "./Entities/Products/Product";
import {Quant} from "./Entities/Inventory/Quant";
import {Serial} from "./Entities/Inventory/Serial";
import {Warehouse} from "./Entities/Inventory/Warehouse";
import {Odoo} from "./Odoo";
import {OdooFactory} from "./OdooFactory";
import {OdooConfiguration} from "./Config/OdooConfiguration";
import {OdooCompany} from "./Config/OdooCompany";

import * as Api from "./API/api";

const Config = {
    OdooConfiguration,
    OdooCompany
};

const Entities = {
    Category,
    Company,
    Employee,
    InventoryAdjustment,
    Location,
    Product,
    Quant,
    Serial,
    Warehouse
};

export {
    Api,
    Config,
    Entities,
    Odoo,
    OdooFactory,
};


