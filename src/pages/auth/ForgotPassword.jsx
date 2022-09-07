import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthButton, AuthLink, Input } from "../../components";
import ForgorPasswordImage from "../../images/forgor_password.svg";

export default function ForgorPassword() {
  const { setImg } = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setImg(ForgorPasswordImage);
  }, [setImg]);

  const disabled = () => email === "";

  return (
    <form>
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
        handler={() => {
          console.log(email);
        }}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to SignIn" to="/" size="xl" />
      </div>
    </form>
  );
}
