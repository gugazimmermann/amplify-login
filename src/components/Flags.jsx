import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import { LANGUAGES, ROUTES, TYPES } from "../constants";
import { useCloseModal } from "../helpers";
import Arrow from "../images/Arrow";
import BR from "../images/flags/pt-BR.svg";
import EN from "../images/flags/en-US.svg";

export default function Flags() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const ref = useCloseModal(open, setOpen);

  function showFlag(lang) {
    if (lang === "pt-BR")
      return <img src={BR} alt="Português" className="w-6 h-6" />;
    return <img src={EN} alt="English" className="w-6 h-6" />;
  }

  function handleChangeLanguage(lang) {
    const currentRoute = Object.keys(ROUTES[state.lang])
      .map((k) => ({ key: k, value: ROUTES[state.lang][k] }))
      .find((r) => r.value === location.pathname);
    dispatch({ type: TYPES.UPDATE_LANG, payload: lang });
    navigate(ROUTES[lang][currentRoute.key]);
    setOpen(false);
  }

  return (
    <div className="absolute top-2 right-2 z-50">
      <button
        type="button"
        className="flex items-center px-1"
        onClick={() => setOpen(!open)}
      >
        {showFlag(state.lang)}
        <Arrow styles={`ml-1 w-4 h-4 ${open && "rotate-180"}`} />
      </button>
      <ul
        ref={ref}
        className={`flex flex-col items-start pl-1 mt-2 ${!open && "hidden"}`}
      >
        {Object.keys(LANGUAGES)
          .filter((l) => l !== state.lang)
          .map((l) => (
            <li key={l}>
              <button type="button" onClick={() => handleChangeLanguage(l)}>
                {showFlag(l)}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
