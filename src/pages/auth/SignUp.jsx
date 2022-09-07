import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { isValidEmail } from "../../helpers";
import { AuthButton, AuthLink, AuthTitle, Input } from "../../components";
import SignUpImage from "../../images/signup.svg";

export default function SignUp() {
  const { setImg, setAlert, signUp } = useOutletContext();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");

  useEffect(() => {
    setImg(SignUpImage);
    setAlert();
  }, [setAlert, setImg]);

  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    pwd === "" ||
    repeat === "" ||
    pwd !== repeat;

  return (
    <form>
      <AuthTitle text="sign up" />
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          value={pwd}
          handler={setPwd}
          showTooltip
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Repeat the Password"
          value={repeat}
          handler={setRepeat}
        />
      </div>
      <AuthButton
        text="Sign Up"
        disabled={disabled()}
        handler={() => signUp(email, pwd, repeat)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}
