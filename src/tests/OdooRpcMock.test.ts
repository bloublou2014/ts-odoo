import {AsyncTest, Expect, Test, TestFixture, Timeout} from "alsatian";

import configuration from "./Config";
import * as TsOdoo from "../index";

@TestFixture()
export class OdooRpcMockTest {

    protected getOdoo(): TsOdoo.Odoo {
        const tsOdooConfig = new TsOdoo.Config.OdooConfiguration();
        tsOdooConfig.database = configuration.database;
        tsOdooConfig.companies = configuration.companies.map(c => {
            const nc = new TsOdoo.Config.OdooCompany();
            nc.isDefault = c.isDefault;
            nc.id = c.id;
            nc.name = c.name;
            nc.username = c.username;
            nc.password = c.password;
            return nc;
        });
        tsOdooConfig.applications.inventory.warehouseCategoryId = configuration.warehouseCategoryId;
        tsOdooConfig.database = configuration.database;
        return TsOdoo.OdooFactory.createOdoo(tsOdooConfig);
    }

    @Test()
    public configShouldExists() {
        Expect(configuration).toBeDefined();
    }

    @Test()
    public odooShouldExists() {
        const odoo = this.getOdoo();
        Expect(odoo).toBeDefined();
    }

    @AsyncTest()
    @Timeout(250000)
    public async shouldGetModel() {
        const odoo = this.getOdoo();
        Expect(odoo).toBeDefined();
        const model = odoo.getModel();
        Expect(model).toBeDefined();
        const result = await model.getModels();
        Expect(result).toBeDefined();
        console.log(result);
        // take all fields ids


    }

}