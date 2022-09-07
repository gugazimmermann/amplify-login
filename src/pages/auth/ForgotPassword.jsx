import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ForgorPasswordImage from "../../images/forgor_password.svg";

export default function ForgorPassword() {
  const { setImg } = useOutletContext();

  useEffect(() => {
    setImg(ForgorPasswordImage);
  }, [setImg]);

  return <form />;
}
