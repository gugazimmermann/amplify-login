import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthButton, AuthLink, AuthTitle, Input } from "../../components";
import SignUpImage from "../../images/signup.svg";

export default function SignUp() {
  const { setImg } = useOutletContext();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");

  useEffect(() => {
    setImg(SignUpImage);
  }, [setImg]);

  const disabled = () => email === "" || pwd === "" || repeat === "";

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
        handler={() => {
          console.log(email, pwd, repeat);
        }}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}
