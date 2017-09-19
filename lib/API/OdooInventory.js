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
const ILogger_1 = require("../Logger/ILogger");
const OdooConfiguration_1 = require("../Config/OdooConfiguration");
const OdooRpc_1 = require("../RPC/OdooRpc");
let OdooInventory = class OdooInventory {
};
__decorate([
    inversify_1.inject(ILogger_1.ILogger),
    __metadata("design:type", ILogger_1.ILogger)
], OdooInventory.prototype, "logger", void 0);
__decorate([
    inversify_1.inject(OdooConfiguration_1.OdooConfiguration),
    __metadata("design:type", OdooConfiguration_1.OdooConfiguration)
], OdooInventory.prototype, "config", void 0);
__decorate([
    inversify_1.inject(OdooRpc_1.OdooRpc),
    __metadata("design:type", OdooRpc_1.OdooRpc)
], OdooInventory.prototype, "odoo", void 0);
OdooInventory = __decorate([
    inversify_1.injectable()
], OdooInventory);
exports.OdooInventory = OdooInventory;
//# sourceMappingURL=OdooInventory.js.map