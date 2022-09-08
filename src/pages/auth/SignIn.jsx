import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { AppContext } from "../../context";
import { LANGUAGES, ROUTES } from "../../constants";
import { isValidEmail } from "../../helpers";
import {
  AuthLink,
  AuthTitle,
  Button,
  Input,
  RememberMe,
} from "../../components";
import SignInImage from "../../images/signin.svg";

export default function SignIn() {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { setImg, setAlert, signIn } = useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setImg(SignInImage);
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert, setImg]);

  const disabled = () => email === "" || !isValidEmail(email) || pwd === "";

  return (
    <form>
      <AuthTitle text={LANGUAGES[state.lang].Auth.SignInTitle} />
      <div className="mb-4">
        <Input
          type="email"
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={setPwd}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <RememberMe remember={remember} setRemember={setRemember} />
        <AuthLink
          to={ROUTES[state.lang].FORGOT_PASSWORD}
          text={LANGUAGES[state.lang].Auth.ForgotPassword}
        />
      </div>
      <Button
        text={LANGUAGES[state.lang].Auth.SignInButton}
        disabled={disabled()}
        handler={() => signIn(email, pwd, remember)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink
          to={ROUTES[state.lang].SIGN_UP}
          text={LANGUAGES[state.lang].Auth.NotRegistered}
          size="xl"
        />
      </div>
    </form>
  );
}
