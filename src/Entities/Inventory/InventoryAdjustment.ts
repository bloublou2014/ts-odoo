export class InventoryAdjustment {
    public id: number;
    public name: string;
    public display_name: string;
    public filter: string;
    public move_ids: number[];
    public state: string;
    public date: Date;
    public accounting_date: Date;
    public last_update: Date;
    public line_ids: number[];

    public company_id: number;
    public company_display_name: string;

    public location_id: number;
    public location_display_name: string;

    public partner_id: number;
    public partner_display_name: string;

    public product_id: number;
    public product_display_name: string;

    public package_id: number;
    public package_display_name: string;

    public lot_id: number;
    public lot_display_name: string;
}
