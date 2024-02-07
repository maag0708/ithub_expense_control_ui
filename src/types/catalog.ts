
export enum CatalogType {
    ACCOUNT = 0,
    CONCEPT = 1,
    SERVICETYPE = 2,
    SUBSIDIARY = 3,
    VENDOR = 4,
    WEEK = 5,
    VEHICLE = 6
}

export interface Catalog {
    id: number;
    name: string;
    identifier: string;
}