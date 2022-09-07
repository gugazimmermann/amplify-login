import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SignUpImage from "../../images/signup.svg";

export default function SignUp() {
  const { setImg } = useOutletContext();

  useEffect(() => {
    setImg(SignUpImage);
  }, [setImg]);

  return <form />;
}
