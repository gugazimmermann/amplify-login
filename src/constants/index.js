import { pt_br_lang, en_us_lang } from "./languages";
import { pt_br_routes, en_us_routes } from "./routes";

export const STATENAME = process.env.REACT_APP_STATE || "amplifylogin";

export const TYPES = {
  UPDATE_LANG: "UPDATE_LANG",
  UPDATE_USER: "UPDATE_USER",
};

export const LANGUAGES = {
  "en-US": en_us_lang,
  "pt-BR": pt_br_lang,
};

export const ROUTES = {
  "en-US": en_us_routes,
  "pt-BR": pt_br_routes,
};
