"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("./Entities/Products/Category");
const Company_1 = require("./Entities/Common/Company");
const Employee_1 = require("./Entities/Employees/Employee");
const InventoryAdjustment_1 = require("./Entities/Inventory/InventoryAdjustment");
const Location_1 = require("./Entities/Inventory/Location");
const Product_1 = require("./Entities/Products/Product");
const Quant_1 = require("./Entities/Inventory/Quant");
const Serial_1 = require("./Entities/Inventory/Serial");
const Warehouse_1 = require("./Entities/Inventory/Warehouse");
const OdooModel_1 = require("./API/OdooModel");
exports.OdooModel = OdooModel_1.OdooModel;
const Odoo_1 = require("./Odoo");
exports.Odoo = Odoo_1.Odoo;
const OdooFactory_1 = require("./OdooFactory");
exports.OdooFactory = OdooFactory_1.OdooFactory;
const OdooConfiguration_1 = require("./Config/OdooConfiguration");
const OdooCompany_1 = require("./Config/OdooCompany");
const Entities = {
    Category: Category_1.Category,
    Company: Company_1.Company,
    Employee: Employee_1.Employee,
    InventoryAdjustment: InventoryAdjustment_1.InventoryAdjustment,
    Location: Location_1.Location,
    Product: Product_1.Product,
    Quant: Quant_1.Quant,
    Serial: Serial_1.Serial,
    Warehouse: Warehouse_1.Warehouse
};
exports.Entities = Entities;
const Api = {
    OdooModel: OdooModel_1.OdooModel
};
const Config = {
    OdooConfiguration: OdooConfiguration_1.OdooConfiguration,
    OdooCompany: OdooCompany_1.OdooCompany
};
exports.Config = Config;
