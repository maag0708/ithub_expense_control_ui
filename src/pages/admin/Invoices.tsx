import { useState } from "react";
import Layout from "../../components/layout/Layout";
import InvoiceTable from "../../components/molecules/Admin/InvoiceTable/InvoiceTable";

const InvoicePage = () => {

  const [invoices, setInvoices] = useState([]);

  return (
    <Layout title="Costos">
     <>
      <InvoiceTable invoices={invoices} />
     </>
    </Layout>
  );
};

export default InvoicePage;
