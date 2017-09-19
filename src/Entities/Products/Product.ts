export class Product {
    public id: number;
    public name: string;
    public type: string;
    public default_code: string;
    public barcode: string;
    public tracking: string;

    public categ_id: number;
    public categ_display_name: string;

    public product_tmpl_id: number;
    public product_tmpl_display_name: string;

    public is_valid_name: boolean;
    public manufacturer: string;
    public part_number: string;
    public description: string;
}
