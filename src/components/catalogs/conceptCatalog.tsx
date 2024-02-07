
import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useConceptCatalog = () => {
  const [conceptCatalog, setConceptCatalog] = useState<FormFieldOptions[]>([]);
  const getConceptCatalog = useCallback(async () => {
    const Concepts = await getCatalogById(CatalogType.CONCEPT);
    if (!Concepts) return;
    setConceptCatalog(Concepts.data);
  }, []);

  useEffect(() => {
    getConceptCatalog();
  }, [getConceptCatalog]);

  return { conceptCatalog };
};
