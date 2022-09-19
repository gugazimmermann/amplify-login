/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from "react";
import { LANGUAGES, ROUTES } from "../../constants";
import { Alert, Title } from "../../components";
import { AppContext } from "../../context";
import ProfileEmail from "./ProfileEmail";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileLanguage from "./ProfileLanguage";
import ProfileAttributes from "./ProfileAttributes";

export default function Profile() {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [alert, setAlert] = useState();

  const handleErrors = useCallback((message) => {
    let errorMessage = message;
    switch (message) {
      case "Attempt limit exceeded, please try after some time.":
        errorMessage = LANGUAGES[user.locale].CommonError.AttemptLimit;
        break;
      case "An account with the given email already exists.":
        errorMessage = LANGUAGES[user.locale].CommonError.Email;
        break;
      case "Invalid verification code provided, please try again.":
        errorMessage = LANGUAGES[user.locale].CommonError.CodeError;
        break;
      case "Incorrect username or password.":
        errorMessage = LANGUAGES[user.locale].CommonError.Password;
        break;
      case "Password did not conform with policy: Password must have symbol characters":
        errorMessage = LANGUAGES[user.locale].CommonError.NewPassword;
        break;
      default:
        errorMessage = message;
    }
    setAlert({ type: "error", text: errorMessage });
  }, [user.locale]);

  return (
    <section className="p-4">
      <Title
        text={LANGUAGES[user.locale].Profile.Profile}
        back={ROUTES[user.locale].HOME}
      />
      {alert?.type && <Alert type={alert?.type} text={alert?.text} /> }
      <div className="grid sm:grid-cols-2 gap-2">
        <ProfileAttributes handleErrors={handleErrors} setAlert={setAlert} />
        <ProfileLanguage setAlert={setAlert} />
        <ProfileChangePassword handleErrors={handleErrors} setAlert={setAlert} />
        <ProfileEmail handleErrors={handleErrors} setAlert={setAlert} />
      </div>
    </section>
  );
}
