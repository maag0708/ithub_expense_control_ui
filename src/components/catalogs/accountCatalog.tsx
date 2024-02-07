
import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useAccountCatalog = () => {
  const [accountCatalog, setAccountCatalog] = useState<FormFieldOptions[]>([]);
  const getAccountCatalog = useCallback(async () => {
    const Accounts = await getCatalogById(CatalogType.ACCOUNT);
    if (!Accounts) return;
    setAccountCatalog(Accounts.data);
  }, []);

  useEffect(() => {
    getAccountCatalog();
  }, [getAccountCatalog]);

  return { accountCatalog };
};
