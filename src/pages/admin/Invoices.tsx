import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import InvoiceTable from "../../components/molecules/Admin/InvoiceTable/InvoiceTable";
import { getAllServices } from "../../services/services.service";
import { IService } from "../../models/IService";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<IService[]>([]);

  const getAllInvoices = useCallback(async () => {
    const invoices = await getAllServices();
    console.log(invoices);
    setInvoices(invoices);
  }, []);

  useEffect(() => {
    getAllInvoices();
  }, [getAllInvoices]);

  return (
    <Layout title="Costos">
      <>
        <InvoiceTable invoices={invoices} />
      </>
    </Layout>
  );
};

export default InvoicePage;
