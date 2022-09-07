import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthButton, AuthLink, Input, RememberMe } from "../../components";
import SignInImage from "../../images/signin.svg";

export default function SignIn() {
  const { setImg } = useOutletContext();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setImg(SignInImage);
  }, [setImg]);

  const disabled = () => email === "" || pwd === "";

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
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          value={pwd}
          handler={setPwd}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <RememberMe remember={remember} setRemember={setRemember} />
        <AuthLink to="/forgorpassword" text="Forgot Password?" />
      </div>
      <AuthButton
        text="Sign In"
        disabled={disabled()}
        handler={() => {
          console.log(email, pwd, remember);
        }}
      />
      <div className="w-full text-center mt-6">
        <AuthLink to="/signup" text="Sign Up" size="xl" />
      </div>
    </form>
  );
}
