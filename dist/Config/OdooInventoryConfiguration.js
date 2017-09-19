"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OdooInventoryConfiguration {
    constructor() {
        /**
         * Sub category Id to limit warehouse product to a specific sub sections
         * Avoid showing all companies products for inventory system
         */
        this.warehouseCategoryId = 1;
    }
}
exports.OdooInventoryConfiguration = OdooInventoryConfiguration;
