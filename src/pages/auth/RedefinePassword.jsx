import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { AuthButton, AuthLink, AuthTitle, Input } from "../../components";
import RedefinePasswordImage from "../../images/redefine_password.svg";

export default function RedefinePassword() {
  const location = useLocation();
  const { setImg, setAlert, redefinePassword } = useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [code, setCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");

  useEffect(() => {
    setImg(RedefinePasswordImage);
    setAlert(location?.state?.alert)
  }, [location?.state?.alert, setAlert, setImg]);

  const disabled = () => email === "" || pwd === "" || repeat === "";

  return (
    <form>
      <AuthTitle text="redefine password" />
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Code" value={code} handler={setCode} />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          value={pwd}
          handler={setPwd}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Repeat Password"
          value={repeat}
          handler={setRepeat}
        />
      </div>
      <AuthButton
        text="Redefine Password"
        disabled={disabled()}
        handler={() => redefinePassword(email, code, pwd, repeat)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}
