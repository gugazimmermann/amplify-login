import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Alert, Loading } from "../../components";

export default function AuthLayout() {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  const startLoading = () => {
    setLoading(true);
    setAlert();
  };

  const stopLoading = () => {
    setLoading(false);
    setAlert();
  };

  const signIn = async (email, pwd, remember) => {
    startLoading();
    stopLoading();
    navigate("/home");
  };

  const sendForgotPasswordCode = async (email) => {
    startLoading();
    stopLoading();
    navigate("/redefinepassword", {
      state: { email, alert: { type: "info", text: "Check your Email" } },
    });
  };

  const redefinePassword = async (email, code, pwd, repeat) => {
    startLoading();
    stopLoading();
    navigate("/", { state: { email, alert: { type: "success", text: "Password changed successfully!" } } });
  };

  const signUp = async (email, pwd, repeat) => {
    startLoading();
    stopLoading();
    navigate("/confirmsignup", { state: { email, alert: { type: "info", text: "Check your Email" } } });
  };

  const resendConfirmationCode = async (email) => {
    startLoading();
    stopLoading();
    navigate("/confirmsignup", { state: { email, resent: true } });
  };

  const confirmSignUp = async (email, code) => {
    startLoading();
    stopLoading();
    navigate("/", { state: { email, alert: { type: "success", text: "Confirmation successful!" } } });
  };

  return (
    <section className="h-screen mx-auto bg-white">
      {loading && <Loading />}
      <div className="container h-full fixed">
        <div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
          <div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">
            {img && <img src={img} alt="SignUp" className="w-full" />}
          </div>
          <div className="w-10/12 md:w-5/12 lg:w-4/12">
            <Alert type={alert?.type} text={alert?.text} />
            <Outlet
              context={{
                setImg,
                setAlert,
                signIn,
                sendForgotPasswordCode,
                redefinePassword,
                signUp,
                resendConfirmationCode,
                confirmSignUp,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
