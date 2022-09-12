import { useContext } from "react";
import { Title } from "../../components";
import { LANGUAGES } from "../../constants";
import { AppContext } from "../../context";

export default function SummaryDetails({handleSetTab}) {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="mt-4 text-center">
        <Title text={LANGUAGES[state.user.locale].KYC.Summary.Title} size="text-2xl" />
      </div>
    </>
  );
}