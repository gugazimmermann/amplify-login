import { useCallback, useContext, useEffect, useState } from "react";
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { ComprehendClient } from "@aws-sdk/client-comprehend";
import awsConfig from "../../aws-exports";
import Auth from "../../api/auth";
import { AppContext } from "../../context";
import { Alert } from "../../components";
import Welcome from "../welcome/Welcome";
import LivelinessCheck from "../liveliness-check/LivelinessCheck";
import UploadDocuments from "../upload-documents/UploadDocuments";
import SummaryDetails from "../summary-details/SummaryDetails";
import { LANGUAGES } from "../../constants";

export default function Home() {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [rekognitionClient, setRekognitionClient] = useState();
  const [comprehendClient, setComprehendClient] = useState();
  const [userData, setUserData] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [tab, setTab] = useState(1);
  const [tabs, setTabs] = useState([
    { name: LANGUAGES[user.locale].KYC.Welcome.Button, number: 1, done: false },
    {
      name: LANGUAGES[user.locale].KYC.Liveliness.Button,
      number: 2,
      done: true,
    },
    {
      name: LANGUAGES[user.locale].KYC.Documents.Button,
      number: 3,
      done: true,
    },
    { name: LANGUAGES[user.locale].KYC.Summary.Button, number: 4, done: true },
  ]);

  const configClients = useCallback(async () => {
    const authCredentials = await Auth.GetCredentials();
    const client = new RekognitionClient({
      region: awsConfig.aws_cognito_region,
      credentials: authCredentials,
    });
    setRekognitionClient(client);
    const compClient = new ComprehendClient({
      region: awsConfig.aws_cognito_region,
      credentials: authCredentials,
    });
    setComprehendClient(compClient);
  }, []);

  useEffect(() => {
    configClients();
  }, [configClients]);

  const renderTabButton = (t) => (
    <button
      key={t.number}
      type="button"
      onClick={() => setTab(t.number)}
      disabled={t.done}
      className={`p-4 w-full rounded-t-md sm:rounded-b-md sm:rounded-t-none ${
        tab === t.number && "bg-indigo-500 text-white font-bold"
      }`}
    >
      {t.name}
    </button>
  );

  const renderTabsButtons = () => (
    <footer className="order-2 sm:order-1 flex flex-row text-sm">
      {tabs.map((t) => renderTabButton(t))}
    </footer>
  );

  const handleSetTab = (actual, next) => {
    const t = tabs.map((x) => x);
    t.forEach((x) => {
      if (x.number === actual) x.done = true;
      if (x.number === next) x.done = false;
    });
    setTabs(t);
    setTab(next);
  };

  return (
    <section className="h-full flex flex-col justify-between sm:justify-start">
      <div className="order-1 sm:order-2 px-8">
        {(!user.name || !user.birthdate) && (
          <Alert
            type="warning"
            text={LANGUAGES[user.locale].Home.CompleteProfile}
          />
        )}
        {tab === 1 && <Welcome handleSetTab={handleSetTab} />}
        {tab === 2 && (
          <LivelinessCheck
            rekognition={rekognitionClient}
            handleSetTab={handleSetTab}
            handleSetImage={setImage1}
          />
        )}
        {tab === 3 && (
          <UploadDocuments
            rekognition={rekognitionClient}
            comprehend={comprehendClient}
            handleSetTab={handleSetTab}
            handleUserData={setUserData}
            handleSetImage={setImage2}
          />
        )}
        {tab === 4 && (
          <SummaryDetails
            rekognition={rekognitionClient}
            handleSetTab={handleSetTab}
            userData={userData}
            image1={image1}
            image2={image2}
          />
        )}
      </div>
      {renderTabsButtons()}
    </section>
  );
}
