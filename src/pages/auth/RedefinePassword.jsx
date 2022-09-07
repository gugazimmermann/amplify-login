import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import RedefinePasswordImage from "../../images/redefine_password.svg";

export default function RedefinePassword() {
  const { setImg } = useOutletContext();

  useEffect(() => {
    setImg(RedefinePasswordImage);
  }, [setImg]);

  return <form />;
}
