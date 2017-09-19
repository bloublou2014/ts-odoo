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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const alsatian_1 = require("alsatian");
const Config_1 = require("./Config");
const TsOdoo = require("../index");
let OdooRpcMockTest = class OdooRpcMockTest {
    getOdoo() {
        const tsOdooConfig = new TsOdoo.Config.OdooConfiguration();
        tsOdooConfig.database = Config_1.default.database;
        tsOdooConfig.companies = Config_1.default.companies.map(c => {
            const nc = new TsOdoo.Config.OdooCompany();
            nc.isDefault = c.isDefault;
            nc.id = c.id;
            nc.name = c.name;
            nc.username = c.username;
            nc.password = c.password;
            return nc;
        });
        tsOdooConfig.applications.inventory.warehouseCategoryId = Config_1.default.warehouseCategoryId;
        tsOdooConfig.database = Config_1.default.database;
        return TsOdoo.OdooFactory.createOdoo(tsOdooConfig);
    }
    configShouldExists() {
        alsatian_1.Expect(Config_1.default).toBeDefined();
    }
    odooShouldExists() {
        const odoo = this.getOdoo();
        alsatian_1.Expect(odoo).toBeDefined();
    }
    shouldGetModel() {
        return __awaiter(this, void 0, void 0, function* () {
            const odoo = this.getOdoo();
            alsatian_1.Expect(odoo).toBeDefined();
            const model = odoo.getModel();
            alsatian_1.Expect(model).toBeDefined();
            const result = yield model.getModels();
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OdooRpcMockTest.prototype, "configShouldExists", null);
__decorate([
    alsatian_1.Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OdooRpcMockTest.prototype, "odooShouldExists", null);
__decorate([
    alsatian_1.AsyncTest(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OdooRpcMockTest.prototype, "shouldGetModel", null);
OdooRpcMockTest = __decorate([
    alsatian_1.TestFixture()
], OdooRpcMockTest);
exports.OdooRpcMockTest = OdooRpcMockTest;
//# sourceMappingURL=OdooRpcMock.test.js.map