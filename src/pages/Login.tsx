import { Form, Formik } from "formik";
import React from "react";
import { ILogin } from "../models/ILogin";
import * as Yup from "yup";
import Card from "../components/atoms/Card/Card";
import Input from "../components/atoms/Input/InputText";
import { Button } from "primereact/button";
import { setLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values: ILogin) => {
    console.log(values);
    setLocalStorage('user', values)
    navigate('/')
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="z-5 w-18rem md:w-full max-w-28rem">
          <Card
            style="border-1 border-round-3xl shadow-6"
            children={
              <div className="flex flex-column justify-content-center align-items-center gap-4 ">
                <img
                  alt="Card"
                  src="http://farmaciasroma.centralus.cloudapp.azure.com:8007/assets/images/roma_logo-1.png"
                  style={{ width: "150px" }}
                />
                <p className="text-3xl m-0">Iniciar Sesion</p>

                <Input
                  name="email"
                  label="Correo"
                  type="email"
                  size="small"
                  style="w-16rem md:w-20rem"
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.email}
                  error={errors.email}
                />

                <Input
                  name="password"
                  type="password"
                  label="Contraseña"
                  size="small"
                  style="w-16rem md:w-20rem"
                  value={values.password}
                  placeholder="Password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.password}
                  error={errors.password}
                />

                <Button
                  className="w-full max-w-20rem flex justify-content-center align-items-center"
                  size="small"
                  loading={loading}
                  type="submit"
                >
                  {!loading && "Iniciar Sesion"}
                </Button>
              </div>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div className="bg-blue-50">
      <div className="oval-top inline"></div>
      <div className="oval-bottom inline"></div>

      <div
        className="
        flex 
        flex-row 
        justify-content-center 
        align-items-center 
        h-full 
        min-h-screen
        md:justify-content-evenly
        gap-8
        "
      >
        <div className="hidden flex-column gap-3 justify-content-center lg:flex">
          <img
            src="https://farmaciasroma.com/wp-content/uploads/2023/12/Farmacias-Roma-60-aniversario.png"
            style={{ width: "100px", height: "75px" }}
          />
          <p className="text-2xl m-0">Farmacias Roma </p>
          <p className="text-2xl ml-6 m-0">Mas que una farmacia</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
