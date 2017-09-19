"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const OdooInventory_1 = require("./API/OdooInventory");
const OdooEmployees_1 = require("./API/OdooEmployees");
const OdooModel_1 = require("./API/OdooModel");
const OdooIoCConfig_1 = require("./OdooIoCConfig");
let Odoo = class Odoo {
    getModel() {
        return this.container.get(OdooModel_1.OdooModel);
    }
    /**
     * Get Odoo inventory System
     * @returns {OdooInventory}
     */
    getInventory() {
        return this.container.get(OdooInventory_1.OdooInventory);
    }
    getEmployees() {
        return this.container.get(OdooEmployees_1.OdooEmployees);
    }
    /**
     * setup available modules to Inversify IOC Container
     * @param {Container} container
     */
    setupInversify(container) {
        OdooIoCConfig_1.OdooIoCConfig.setupExternalContainer(this.container, container);
    }
};
__decorate([
    inversify_1.inject(inversify_1.Container),
    __metadata("design:type", inversify_1.Container)
], Odoo.prototype, "container", void 0);
Odoo = __decorate([
    inversify_1.injectable()
], Odoo);
exports.Odoo = Odoo;
//# sourceMappingURL=Odoo.js.map