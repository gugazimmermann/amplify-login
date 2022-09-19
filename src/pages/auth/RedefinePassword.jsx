/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context";
import { LANGUAGES, ROUTES } from "../../constants";
import { isValidEmail } from "../../helpers";
import { AuthLink, AuthTitle, Button, Input } from "../../components";
import RedefinePasswordImage from "../../images/redefine_password.svg";

export default function RedefinePassword() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { state } = useContext(AppContext);
  const { setImg, setAlert, redefinePassword } = useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [code, setCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");


  useEffect(() => {
		if (searchParams.get('email')) setEmail(searchParams.get('email'));
		if (searchParams.get('code')) setCode(searchParams.get('code'));
	}, [searchParams]);

  
  useEffect(() => {
    setImg(RedefinePasswordImage);
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert, setImg]);

  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    code === "" ||
    code.length < 6 ||
    pwd === "" ||
    repeat === "" ||
    pwd !== repeat;

  return (
    <form>
      <AuthTitle text={LANGUAGES[state.lang].Auth.RedefinePasswordTitle} />
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
      <div className="mb-4">
        <Input
          type="password"
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={setPwd}
          showTooltip
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
          value={repeat}
          handler={setRepeat}
        />
      </div>
      <Button
        text={LANGUAGES[state.lang].Auth.RedefinePasswordButton}
        disabled={disabled()}
        handler={() => redefinePassword(email, code, pwd, repeat)}
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
