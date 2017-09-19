import { OdooCompany } from "./OdooCompany";
import { OdooApplications } from "./OdooApplications";
export declare class OdooConfiguration {
    /**
     * Odoo database name
     */
    database: string;
    companies: OdooCompany[];
    applications: OdooApplications;
}
