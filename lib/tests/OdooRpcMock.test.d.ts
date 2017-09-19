import * as TsOdoo from "../index";
export declare class OdooRpcMockTest {
    protected getOdoo(): TsOdoo.Odoo;
    configShouldExists(): void;
    odooShouldExists(): void;
    shouldGetModel(): Promise<void>;
}
