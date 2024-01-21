import React from "react";
import LoginForm from "../components/organisms/Login/LoginForm/LoginForm";
import Alert from "../components/atoms/Alert/Alert";

const LoginPage: React.FC = () => {
  return (
    <div className="bg-blue-50">
      <Alert />
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
          <p className="text-2xl m-0">Farmacias Roma</p>
          <p className="text-2xl ml-6 m-0">Más que una farmacia</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
