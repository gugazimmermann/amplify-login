import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context";
import { LANGUAGES } from "../../constants";
import Mudations from "../../api/mutations";
import { Button, Form, Input } from "../../components";
import { FormatDate } from "../../helpers";
import moment from "moment";

const ProfileAttributes = ({ handleErrors, setAlert }) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const { loadUser, setLoading } = useOutletContext();
  const [name, setName] = useState("");
  const [birthdate, setBithdate] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setBithdate(user?.birthdate ? FormatDate.Show(user?.birthdate, user.locale) : "");
    }
  }, [user]);

  const loading = () => {
    setAlert();
    setLoading(true);
  };

  const handleAttributes = async () => {
    loading();
    try {
      const birthdateFormated =
        user.locale === "pt-BR"
          ? moment(birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : moment(birthdate, "YYYY-MM-DD").format("YYYY-MM-DD");
      await Mudations.UpdateUser({
        id: user.id,
        email: user.email,
        locale: user.locale,
        name,
        birthdate: birthdateFormated,
      });
      loadUser({ force: true, email: user.email });
      setAlert({
        type: "success",
        text: LANGUAGES[user.locale].Profile.AttributesSuccess,
      });
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleFormatDate = (date) => setBithdate(FormatDate.Format(date, user.locale));

  const disabledAttributes = () => !name || !birthdate;

  return (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Input
          type="text"
          placeholder={LANGUAGES[user.locale].Profile.Name}
          value={name}
          handler={setName}
          error={!name}
        />
        <Input
          type="text"
          placeholder={LANGUAGES[user.locale].Profile.Birthdate}
          value={birthdate}
          handler={handleFormatDate}
          error={!birthdate}
        />
        <Button
          text={LANGUAGES[user.locale].Profile.ChangeAttributes}
          disabled={disabledAttributes()}
          handler={() => handleAttributes()}
        />
      </div>
    </Form>
  );
};

export default ProfileAttributes;
