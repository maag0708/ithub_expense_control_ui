
import { useCallback, useEffect, useState } from "react";
import { FormFieldOptions } from "../../types/form";
import { getCatalogById } from "../../services/catalog.service";
import { CatalogType } from "../../types/catalog";

export const useVehicleCatalog = () => {
  const [vehicleCatalog, setVehicleCatalog] = useState<FormFieldOptions[]>([]);
  const getVehicleCatalog = useCallback(async () => {
    const Vehicles = await getCatalogById(CatalogType.VEHICLE);
    if (!Vehicles) return;
    setVehicleCatalog(Vehicles.data);
  }, []);

  useEffect(() => {
    getVehicleCatalog();
  }, [getVehicleCatalog]);

  return { vehicleCatalog };
};
