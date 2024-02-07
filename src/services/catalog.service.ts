import { TResult } from "../types/TResult";
import { CatalogType } from "../types/catalog";
import { FormFieldOptions } from "../types/form";
import { get } from "../utils/axios";

const BASE_PATH = "/Catalog";

export const getCatalogById = async (
  type: CatalogType
): Promise<TResult<FormFieldOptions[]>> => get(`${BASE_PATH}/${type}`);

export const getIdFromCatalog = (catalog: FormFieldOptions[], value: string) => {
  const item = catalog.find((item) => item.name === value);
  return item?.id;
};

export const getFromCatalog = (catalog: FormFieldOptions[], id: number) => {
  console.log(catalog, id);
  const item = catalog.find((item) => item.id === id);
  console.log({item});
  return item;
}