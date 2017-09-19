import {OdooCompany} from "./OdooCompany";
import {OdooApplications} from "./OdooApplications";

export class OdooConfiguration {

    /**
     * Odoo database name
     */
    public database: string;

    public companies: OdooCompany[];

    public applications : OdooApplications;
}
