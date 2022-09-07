import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ConfirmSignUpImage from "../../images/confirm_signup.svg";

export default function ConfirmSignUp() {
  const { setImg } = useOutletContext();

  useEffect(() => {
    setImg(ConfirmSignUpImage);
  }, [setImg]);

  return <form />;
}
