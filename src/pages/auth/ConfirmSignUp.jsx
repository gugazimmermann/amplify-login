/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context";
import { LANGUAGES, ROUTES } from "../../constants";
import { isValidEmail } from "../../helpers";
import { AuthLink, AuthTitle, Button, Input } from "../../components";
import ConfirmSignUpImage from "../../images/confirm_signup.svg";

export default function ConfirmSignUp() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { state } = useContext(AppContext);
  const { setImg, setAlert, resendConfirmationCode, confirmSignUp } =
    useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [code, setCode] = useState("");

  useEffect(() => {
		if (searchParams.get('email')) setEmail(searchParams.get('email'));
		if (searchParams.get('code')) setCode(searchParams.get('code'));
	}, [searchParams]);

  useEffect(() => {
    setImg(ConfirmSignUpImage);
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert, setImg]);

  const disabled = () =>
    email === "" || !isValidEmail(email) || code === "" || code.length < 6;

  return (
    <form>
      <AuthTitle text={LANGUAGES[state.lang].Auth.ConfirmRegistrationTitle} />
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
          type="text"
          placeholder={LANGUAGES[state.lang].Code}
          value={code}
          handler={setCode}
        />
      </div>
      <div className="mb-4 flex justify-end text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out">
        <button type="button" onClick={() => resendConfirmationCode(email)}>
          {LANGUAGES[state.lang].Auth.ResendConfirmationCode}
        </button>
      </div>
      <Button
        text={LANGUAGES[state.lang].Auth.ConfirmRegistrationButton}
        disabled={disabled()}
        handler={() => confirmSignUp(email, code)}
        full
      />
      <div className="w-full text-center mt-6">
        <AuthLink
          text={LANGUAGES[state.lang].Auth.BackToSignIn}
          to={ROUTES[state.lang].SIGN_IN}
          size="xl"
        />
      </div>
    </form>
  );
}
