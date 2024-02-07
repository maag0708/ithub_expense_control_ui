import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useSubsidiaryCatalog = () => {
  const [subsidiaryCatalog, setSubsidiaryCatalog] = useState<FormFieldOptions[]>([]);
  const getSubsidiaryCatalog = useCallback(async () => {
    const subsidiarys = await getCatalogById(CatalogType.SUBSIDIARY);
    if (!subsidiarys) return;
    setSubsidiaryCatalog(subsidiarys.data);
  }, []);

  useEffect(() => {
    getSubsidiaryCatalog();
  }, [getSubsidiaryCatalog]);

  return { subsidiaryCatalog };
};
