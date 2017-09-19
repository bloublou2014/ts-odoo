import {IOdooRpc} from "../../RPC/IOdooRpc";
import {OdooCompany} from "../../Config/OdooCompany";
import {OdooSearchResult} from "../../RPC/OdooSearchResult";
import {OdooCountResult} from "../../RPC/OdooCountResult";
import * as OdooXmlRpc from "odoo-xmlrpc";
import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";

export class TestModel {
    public model: string;
    public query: string;
    public filename: string;
}

export class OdooRpcMock implements IOdooRpc {

    protected testModels: TestModel[] = [];

    public setRequiredModel(models: TestModel[]) {
        this.testModels.concat(models);
    }

    protected getModel(model, query) {
        const jsonQuery = JSON.stringify(query);
        return _.find(this.testModels, testModel => {
            return testModel.model === model
                && JSON.stringify(testModel.query) === jsonQuery;
        });
    }

    protected getTestContent(testModel: TestModel): any {
        const filename = path.resolve(path.join(__dirname, '../Samples', testModel.filename));
        const content = fs.readFileSync(filename);
        return JSON.parse(content.toString());
    }

    public getOdooConnection(company: OdooCompany): Promise<OdooXmlRpc> {
        return undefined;
    }

    public searchReadOneCompany(company: OdooCompany, model, query, fields, from, limit: number): Promise<OdooSearchResult> {
        // select model and query required for this test
        const testModel = this.getModel(model, query);
        const result = this.getTestContent(testModel);
        const r = new OdooSearchResult();
        r.company = company;
        r.items = result;
        return Promise.resolve(r);
    }

    public countOneCompany(company: OdooCompany, model, query): Promise<OdooCountResult> {
        const testModel = this.getModel(model, query);
        const result = this.getTestContent(testModel);
        const r = new OdooCountResult();
        r.company = company;
        r.count = result;
        return Promise.resolve(r);
    }

    public getDefaultCompany(): OdooCompany {
        return undefined;
    }

    public searchRead(company: OdooCompany | OdooCompany[], model, query, fields, from, limit): Promise<OdooSearchResult[]> {
        const testModel = this.getModel(model, query);
        const result = this.getTestContent(testModel);
        if (!Array.isArray(company)) {
            company = [company];
        }
        const results = _.map(company, c => {
            const r = new OdooSearchResult();
            r.company = c;
            r.items = result;
        });

        return Promise.resolve(results);
    }

    public count(company: OdooCompany | OdooCompany[], model, query): Promise<OdooCountResult[]> {
        const testModel = this.getModel(model, query);
        const result = this.getTestContent(testModel);
        if (!Array.isArray(company)) {
            company = [company];
        }
        const results = _.map(company, c => {
            const r = new OdooCountResult();
            r.company = c;
            r.count = result;
        });

        return Promise.resolve(results);
    }

    public searchReadWithCount(company: OdooCompany | OdooCompany[] | any, model, query, fields, from, limit): Promise<OdooSearchResult[]> {
        const testModel = this.getModel(model, query);
        const result = this.getTestContent(testModel);
        if (!Array.isArray(company)) {
            company = [company];
        }
        const results = _.map(company, c => {
            const r = new OdooSearchResult();
            r.company = c;
            r.items = result;
        });

        return Promise.resolve(results);
    }


}