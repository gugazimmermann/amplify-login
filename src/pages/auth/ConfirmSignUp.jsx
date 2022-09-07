import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthButton, AuthLink, AuthTitle, Input } from "../../components";
import ConfirmSignUpImage from "../../images/confirm_signup.svg";

export default function ConfirmSignUp() {
  const { setImg } = useOutletContext();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setImg(ConfirmSignUpImage);
  }, [setImg]);

  const disabled = () => email === "" || code === "";

  return (
    <form>
      <AuthTitle text="confirm registration" />
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
      <AuthButton
        text="Confim"
        disabled={disabled()}
        handler={() => {
          console.log(email, code);
        }}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}
