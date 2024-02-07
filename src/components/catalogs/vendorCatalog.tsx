import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useVendorCatalog = () => {
  const [vendorCatalog, setVendorCatalog] = useState<FormFieldOptions[]>([]);
  const getVendorCatalog = useCallback(async () => {
    const vendors = await getCatalogById(CatalogType.VENDOR);
    if (!vendors) return;
    setVendorCatalog(vendors.data);
  }, []);

  useEffect(() => {
    getVendorCatalog();
  }, [getVendorCatalog]);

  return { vendorCatalog };
};
