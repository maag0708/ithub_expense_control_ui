import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useWeekCatalog = () => {
  const [weekCatalog, setWeekCatalog] = useState<FormFieldOptions[]>([]);
  const getWeekCatalog = useCallback(async () => {
    const weeks = await getCatalogById(CatalogType.WEEK);
    if (!weeks) return;
    setWeekCatalog(weeks.data);
  }, []);

  useEffect(() => {
    getWeekCatalog();
  }, [getWeekCatalog]);

  return { weekCatalog };
};
