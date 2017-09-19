"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OdooInventoryConfiguration_1 = require("./OdooInventoryConfiguration");
const OdooXmlRpcConfiguration_1 = require("./OdooXmlRpcConfiguration");
class OdooApplications {
    constructor() {
        this.inventory = new OdooInventoryConfiguration_1.OdooInventoryConfiguration();
        this.xmlRpc = new OdooXmlRpcConfiguration_1.OdooXmlRpcConfiguration();
    }
}
exports.OdooApplications = OdooApplications;
//# sourceMappingURL=OdooApplications.js.map