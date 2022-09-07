import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { isValidEmail } from "../../helpers";
import { AuthButton, AuthLink, AuthTitle, Input } from "../../components";
import ForgorPasswordImage from "../../images/forgor_password.svg";

export default function ForgorPassword() {
  const { setImg, setAlert, sendForgotPasswordCode } = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setImg(ForgorPasswordImage);
    setAlert();
  }, [setAlert, setImg]);

  const disabled = () => email === "" || !isValidEmail(email);

  return (
    <form>
      <AuthTitle text="forgot password" />
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          handler={setEmail}
        />
      </div>
      <AuthButton
        text="Send Code"
        disabled={disabled()}
        handler={() => sendForgotPasswordCode(email)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}
