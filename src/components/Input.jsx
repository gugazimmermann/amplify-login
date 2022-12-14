import { useState, useContext } from "react";
import { AppContext } from "../context";
import { LANGUAGES } from "../constants";

const Input = ({ type, placeholder, value, handler, showTooltip, error }) => {
  const { state } = useContext(AppContext);
  const [inputType, setInputType] = useState(type);
  const [tooltip, setTooltip] = useState(false);

  function handleChangeInputType() {
    if (inputType === "password") setInputType("text");
    else if (inputType === "text") setInputType("password");
  }

  return (
    <div className="relative">
      <input
        type={inputType}
        value={value}
        onChange={(e) => handler(e.target.value)}
        className={`block w-full px-4 py-2 font-normal border border-solid rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none ${!error ? 'border-gray-300' : 'border-red-500'}`}
        placeholder={placeholder}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => handleChangeInputType()}
          className="absolute top-1.5 right-1"
        >
          <i
            className={`bx bx-${
              inputType === "password" ? "hide" : "show"
            } text-slate-400 text-2xl`}
          />
        </button>
      )}
      {showTooltip && (
        <>
          <button
            type="button"
            onMouseOver={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className="absolute top-1.5 right-8"
          >
            <i className="bx bx-info-circle text-slate-400 text-2xl" />
          </button>
          <ul
            className={`${
              tooltip ? "flex" : "hidden"
            } flex-col text-left absolute -right-8 top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-white text-sm`}
          >
            <li>{LANGUAGES[state.lang].PasswordRules.Chars}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Lowercase}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Uppercase}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Number}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Symbol}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Input;
