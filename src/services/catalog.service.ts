import { TResult } from "../types/TResult";
import { CatalogType } from "../types/catalog";
import { FormFieldOptions } from "../types/form";
import { get } from "../utils/axios";

const BASE_PATH = "/Catalog";

export const getCatalogById = async (
  type: CatalogType
): Promise<TResult<FormFieldOptions[]>> => get(`${BASE_PATH}/${type}`);
