"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Company {
    static fromOdooCompany(odooCompany) {
        const company = new Company();
        company.id = odooCompany.id;
        company.name = odooCompany.name;
        return company;
    }
}
exports.Company = Company;
