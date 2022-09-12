import { useContext } from "react";
import { Title } from "../../components";
import { LANGUAGES } from "../../constants";
import { AppContext } from "../../context";

export default function Welcome({handleSetTab}) {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="mt-4 text-center">
        <Title text={LANGUAGES[state.user.locale].KYC.Welcome.Title} size="text-2xl" />
      </div>
      <p className="my-4 font-bold">
        {LANGUAGES[state.user.locale].KYC.Welcome.SubTitle}
      </p>
      <ul className="list-disc text-justify">
        <li className="mt-4">{LANGUAGES[state.user.locale].KYC.Welcome.DescriptionOne}</li>
        <li className="mt-4">{LANGUAGES[state.user.locale].KYC.Welcome.DescriptionTwo}</li>
        <li className="mt-4">{LANGUAGES[state.user.locale].KYC.Welcome.DescriptionThree}</li>
      </ul>
      <div className="w-full flex justify-center mt-8">
        <button
          className="border border-indigo-800 bg-indigo-500 text-white px-4 py-1.5 rounded-md shadow-md"
          onClick={() => handleSetTab(1, 2)}
        >
          {LANGUAGES[state.user.locale].KYC.Welcome.Start}
        </button>
      </div>
    </>
  );
}
