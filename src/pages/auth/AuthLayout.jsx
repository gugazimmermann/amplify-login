import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../../api/auth";
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
    try {
      await Auth.SignIn(email, pwd, remember);
      stopLoading();
      navigate("/home");
    } catch (err) {
      stopLoading();
      setAlert({ type: "error", text: "Sorry, Unable to login" });
    }
  };

  const sendForgotPasswordCode = async (email) => {
    startLoading();
    try {
      await Auth.ForgotPassword(email);
      stopLoading();
      navigate("/redefinepassword", {
        state: { email, alert: { type: "info", text: "Check your Email" } },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: "Unable to send code, email is correct?",
      });
    }
  };

  const redefinePassword = async (email, code, pwd) => {
    startLoading();
    try {
      await Auth.RedefinePassword(email, code, pwd);
      stopLoading();
      navigate("/", {
        state: {
          email,
          alert: { type: "success", text: "Password changed successfully!" },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: "Unable to redifine password, email, code or new password are wrong!",
      });
    }
  };

  const signUp = async (email, pwd) => {
    startLoading();
    try {
      await Auth.SignUp(email, pwd, 'en-US');
      stopLoading();
      navigate("/confirmsignup", {
        state: { email, alert: { type: "info", text: "Check your Email" } },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: "Unable to Register, email, code or new password are wrong!",
      });
    }
  };

  const resendConfirmationCode = async (email) => {
    startLoading();
    try {
      await Auth.ResendConfirmationCode(email);
      stopLoading();
      navigate("/confirmsignup", { state: { email, resent: true } });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: "Unable to send code, email is correct?",
      });
    }
  };

  const confirmSignUp = async (email, code) => {
    startLoading();
    try {
      await Auth.ConfirmSignUp(email, code);
      stopLoading();
      navigate("/", {
        state: {
          email,
          alert: { type: "success", text: "Confirmation successful!" },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: "Unable to confirm registration, email or code are wrong!",
      });
    }
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
