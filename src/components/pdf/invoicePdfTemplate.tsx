import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { IService } from "../../models/IService";
import logo from "../../assets/images/logo.png";
const PdfTemplate = ({
  data,
  vendor,
}: {
  data: IService[];
  vendor: string;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            margin: 20,
          }}
        >
          <Image style={styles.logo} src={logo} />
          <Text style={styles.headerText}>Facturas proveedor: {vendor}</Text>
        </View>

        <View
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#002D57",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Text>Detalle de servicios</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text
              style={[
                {
                  width: 20,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              #
            </Text>
            <Text
              style={[
                {
                  width: 70,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              Folio
            </Text>
            <Text
              style={[
                {
                  width: 170,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              Sucursal
            </Text>
            <Text
              style={[
                {
                  width: 80,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              Placas
            </Text>
            <Text
              style={[
                {
                  width: 120,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              Fecha de servicio
            </Text>
            <Text
              style={[
                {
                  width: 100,
                  fontSize: 14,
                  fontStyle: "bold",
                  textAlign: "center",
                  backgroundColor: "#002D57",
                  color: "#ffffff",
                  height: 25,
                  paddingTop: 6,
                },
              ]}
            >
              total
            </Text>
          </View>
          {data.map((service, index) => (
            <View key={index} style={styles.row}>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 20,
                    textAlign: "center",
                  },
                ]}
              >
                {index++}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 70,
                  },
                ]}
              >
                {service.invoice}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 170,
                  },
                ]}
              >
                {service.subsidiary}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 80,
                  },
                ]}
              >
                {service.vehicleNumber}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 120,
                  },
                ]}
              >
                {new Date(service.serviceDate).toLocaleDateString("en-GB")}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 100,
                  },
                ]}
              >
                {service.total}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo según tus necesidades
    height: 75, // Ajusta el tamaño del logo según tus necesidades
  },
  headerText: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    paddingTop: 5,
    fontSize: 10,
    fontStyle: "semibold",
    textAlign: "center",
    border: 1,
    height: 20,
    borderColor: "#000",
    borderStyle: "solid",
  },
});

export default PdfTemplate;
