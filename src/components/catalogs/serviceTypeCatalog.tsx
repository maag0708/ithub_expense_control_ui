
import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useServiceTypeCatalog = () => {
  const [serviceTypeCatalog, setServiceTypeCatalog] = useState<FormFieldOptions[]>([]);
  const getServiceTypeCatalog = useCallback(async () => {
    const ServiceTypes = await getCatalogById(CatalogType.SERVICETYPE);
    if (!ServiceTypes) return;
    setServiceTypeCatalog(ServiceTypes.data);
  }, []);

  useEffect(() => {
    getServiceTypeCatalog();
  }, [getServiceTypeCatalog]);

  return { serviceTypeCatalog };
};
