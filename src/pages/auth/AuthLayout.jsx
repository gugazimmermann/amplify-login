/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { LANGUAGES, ROUTES, TYPES } from "../../constants";
import Auth from "../../api/auth";
import { Alert, Flags, Loading } from "../../components";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
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
      const { attributes } = await Auth.SignIn(email, pwd, remember);
      dispatch({ type: TYPES.UPDATE_LANG, payload: attributes.locale });
      stopLoading();
      navigate(ROUTES[attributes.locale].HOME);
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.Login,
      });
    }
  };

  const sendForgotPasswordCode = async (email) => {
    startLoading();
    try {
      await Auth.ForgotPassword(email);
      stopLoading();
      navigate(ROUTES[state.lang].REDEFINE_PASSWORD, {
        state: {
          email,
          alert: {
            type: "info",
            text: LANGUAGES[state.lang].Auth.ForgotPasswordSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SendCode,
      });
    }
  };

  const redefinePassword = async (email, code, pwd) => {
    startLoading();
    try {
      await Auth.RedefinePassword(email, code, pwd);
      stopLoading();
      navigate(ROUTES[state.lang].SIGN_IN, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.RedefinePasswordSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.RedefinePassword,
      });
    }
  };

  const signUp = async (email, pwd) => {
    startLoading();
    try {
      await Auth.SignUp(email, pwd, state.lang);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_SIGN_UP, {
        state: {
          email,
          alert: {
            type: "info",
            text: LANGUAGES[state.lang].Auth.SignUpSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SignUp,
      });
    }
  };

  const resendConfirmationCode = async (email) => {
    startLoading();
    try {
      await Auth.ResendConfirmationCode(email);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_SIGN_UP, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.ResendConfirmationSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SendCode,
      });
    }
  };

  const confirmSignUp = async (email, code) => {
    startLoading();
    try {
      await Auth.ConfirmSignUp(email, code);
      stopLoading();
      navigate(ROUTES[state.lang].SIGN_IN, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.ConfirmRegistrationSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.ConfirmSignUp,
      });
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        await Auth.GetUser();
        setLoading(false);
        navigate(ROUTES[state.lang].HOME);
      } catch (error) {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  return (
    <main className="h-screen mx-auto bg-white">
      {loading && <Loading />}
      <section className="container h-full fixed">
        {Flags()}
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
      </section>
    </main>
  );
}
