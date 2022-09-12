import { useContext } from "react";
import { Title } from "../../components";
import { LANGUAGES } from "../../constants";
import { AppContext } from "../../context";

export default function UploadDocuments({handleSetTab}) {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="mt-4 text-center">
        <Title text={LANGUAGES[state.user.locale].KYC.Documents.Title} size="text-2xl" />
      </div>
    </>
  );
}