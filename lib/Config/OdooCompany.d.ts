/**
 * Odoo Company Login information
 * Since Odoo can manage multiple companies each one should be describe here
 * In some case Odoo modules can be configured as common for all companies, in that case
 * default company can be used.
 */
export declare class OdooCompany {
    /**
     * Define defaut Company, if there's is only one defined company, it will be the default one
     */
    isDefault: boolean;
    /**
     * Company id must match Odoo company id
     */
    id: number;
    /**
     * Name is for internal use and does not requires to be the exact Odoo company
     */
    name: string;
    /**
     * email used to login to Odoo
     */
    username: string;
    password: string;
}
