import { useContext, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Auth from "../../api/auth";
import Mutations from "../../api/mutations";
import { LANGUAGES, ROUTES } from "../../constants";
import { Button, Form, Select } from "../../components";

const ProfileLanguage = ({ setAlert }) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const navigate = useNavigate();
  const { loadUser, setLoading } = useOutletContext();
  const [language, setLanguage] = useState(user.locale);

  const loading = () => {
    setAlert();
    setLoading(true);
  };

  const handleChangeLanguage = async () => {
    loading();
    try {
      await Auth.ChangeLanguage(language);
      await Mutations.UpdateUser({
        id: user.id,
        email: user.email,
        locale: language,
      });
      loadUser({ force: true, email: user.email });
      navigate(ROUTES[language].PROFILE);
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const disabledLanguage = () => language === user.locale;

  return (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Select value={language} handler={setLanguage}>
          {Object.keys(LANGUAGES).map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Languages[l]}
            </option>
          ))}
        </Select>
        <Button
          text={LANGUAGES[user.locale].Profile.ChangeLanguage}
          disabled={disabledLanguage()}
          handler={() => handleChangeLanguage()}
          full
        />
      </div>
    </Form>
  );
};

export default ProfileLanguage;
