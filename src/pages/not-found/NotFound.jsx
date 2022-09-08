import { useContext } from "react";
import { AppContext } from "../../context";
import { LANGUAGES } from "../../constants";
import NotFoundImg from "../../images/not_found.svg";

const NotFound = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="container bg-white mx-auto">
      <main className="flex flex-col h-screen justify-center items-center">
        <img src={NotFoundImg} alt="not found" className="max-w-xs" />
        <h1 className="mt-4 text-xl">
          {LANGUAGES[state.lang].NotFound.Sorry},{" "}
          {LANGUAGES[state.lang].NotFound.PageNotFound}.
        </h1>
      </main>
    </div>
  );
};

export default NotFound;
