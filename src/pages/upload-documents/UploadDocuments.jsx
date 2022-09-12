import { useState, useEffect, useRef, useContext } from "react";
import Webcam from "react-webcam";
import { Buffer } from "buffer";
import {
  RekognitionClient,
  DetectFacesCommand,
  DetectTextCommand,
} from "@aws-sdk/client-rekognition";
import {
  ComprehendClient,
  DetectEntitiesCommand,
} from "@aws-sdk/client-comprehend";
import awsConfig from "../../aws-exports";
import Auth from "../../api/auth";
import { Title, Button, Spinner, ProgressBar } from "../../components";
import { AppContext } from "../../context";
import { LANGUAGES } from "../../constants";
import slugify from "slugify";
import moment from "moment";
import { ConvertBase64 } from "../../helpers";

const videoConstraintsProps = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const screenShotProps = {
  width: 800,
  height: 450,
};

export default function UploadDocuments({ handleSetTab }) {
  const { state } = useContext(AppContext);
  const webcamRef = useRef(null);
  const [rekognitionClient, setRekognitionClient] = useState();
  const [comprehendClient, setComprehendClient] = useState();
  const [alertMessage, setAlertMessage] = useState(
    LANGUAGES[state.user.locale].KYC.Documents.SubTitle
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [fileName, setFileName] = useState(
    LANGUAGES[state.user.locale].KYC.Documents.FileName
  );
  const [completed, setCompleted] = useState(false);
  const [documentType, setDocumentType] = useState(null);
  const [gender, setGender] = useState(null);
  const [ageRange, setAgeRange] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [username, setUsername] = useState(null);

  const configClients = async () => {
    const authCredentials = await Auth.GetCredentials();
    const rekClient = new RekognitionClient({
      region: awsConfig.aws_cognito_region,
      credentials: authCredentials,
    });
    setRekognitionClient(rekClient);
    const compClient = new ComprehendClient({
      region: awsConfig.aws_cognito_region,
      credentials: authCredentials,
    });
    setComprehendClient(compClient);
  };

  useEffect(() => {
    configClients();
  }, []);

  const handleDocumentType = (words) => {
    let docType = null;
    if (words.find((x) => x.toLocaleLowerCase() === "passport")) {
      docType = LANGUAGES[state.user.locale].KYC.Documents.DocTypePassport;
    }
    if (
      words.find(
        (x) =>
          x.toLocaleLowerCase().includes("transito") ||
          x.toLocaleLowerCase().includes("driver")
      )
    ) {
      docType = LANGUAGES[state.user.locale].KYC.Documents.DocTypeDriver;
    }
    return docType;
  };

  const handleName = (personEntity) => {
    let findName = null;
    findName = personEntity.find((x) => {
      const t = x.Text.includes(", ") ? x.Text.split(", ")[1] : x.Text;
      return slugify(state.user.name, { lower: true }).startsWith(
        slugify(t, { lower: true })
      );
    });
    return findName?.Text || null;
  };

  const findBirthDate = (dobEntity) => {
    let findDob = null;
    findDob = dobEntity.find((x) => {
      const format =
        state.user.locale === "en-US" ? "MM/DD/YYYY" : "DD/MM/YYYY";
      return (
        (x.Text[2] === "/"
          ? moment(x.Text, format).format("YYYY-MM-DD")
          : x.Text) === state.user.birthdate
      );
    });
    return findDob?.Text || null;
  };

  const captureTextDetails = async (image) => {
    let resDocType = null;
    let resName = null;
    let resDoB = null;
    const txtResponse = await rekognitionClient.send(
      new DetectTextCommand({
        Image: { Bytes: image },
        Filters: { WordFilter: { MinConfidence: 80 } },
      })
    );
    setProgressValue(50);
    if (txtResponse?.$response?.error || !txtResponse.TextDetections.length) {
      setLoading(false);
      setErrorMessage(
        txtResponse?.$response?.error?.message ||
          LANGUAGES[state.user.locale].KYC.Documents.NoText
      );
    } else {
      const detected = txtResponse.TextDetections.filter(
        (item) => item.Type === "WORD" && item.Confidence > 95
      );
      const detectedMap = detected.map((item) => item.DetectedText);
      resDocType = handleDocumentType(detectedMap);
      let entitiesResponse = await comprehendClient.send(
        new DetectEntitiesCommand({
          Text: detectedMap.join(" "),
          LanguageCode: state.user.locale === "en-US" ? "en" : "pt",
        })
      );
      setProgressValue(75);
      if (
        entitiesResponse?.$response?.error ||
        !entitiesResponse.Entities.length
      ) {
        setLoading(false);
        setErrorMessage(
          entitiesResponse?.$response?.error?.message ||
            LANGUAGES[state.user.locale].KYC.Documents.NoEntities
        );
      } else {
        entitiesResponse.Entities.sort((a, b) => a.Score - b.Score);
        entitiesResponse.Entities.reverse();
        let entities = entitiesResponse.Entities.filter((e) => e.Score > 0.6);
        let personEntity = entities.filter((e) => e.Type === "PERSON");
        if (!personEntity) setUsername(null);
        else resName = handleName(personEntity);
        let dobEntity = entities.filter((e) => e.Type === "DATE");
        if (!dobEntity | !dobEntity.length) setBirthdate(null);
        else resDoB = findBirthDate(dobEntity);
      }
    }
    return { docType: resDocType, name: resName, dob: resDoB };
  };

  const captureFaceDetails = async (imageBuffer) => {
    let age = null;
    let sex = null;
    const faceDetectResponse = await rekognitionClient.send(
      new DetectFacesCommand({
        Attributes: ["ALL"],
        Image: { Bytes: imageBuffer },
      })
    );
    setProgressValue(75);
    if (
      faceDetectResponse?.$response?.error ||
      !faceDetectResponse.FaceDetails.length
    ) {
      setLoading(false);
      setErrorMessage(
        faceDetectResponse?.$response?.error?.message ||
          LANGUAGES[state.user.locale].KYC.Documents.NoFace
      );
    } else {
      age = faceDetectResponse.FaceDetails[0].AgeRange;
      sex = faceDetectResponse.FaceDetails[0].Gender.Value;
      // get the bounding box
      // let imageBounds = faceDetectResponse.FaceDetails[0].BoundingBox;
      // crop the face and store the image
    }
    return { age, sex };
  };

  const handleProcess = async (imgBase64Strg) => {
    const base64Img = imgBase64Strg.split(";base64,").pop();
    const binaryImg = new Buffer.from(base64Img, "base64");
    setProgressValue(25);
    const { docType, name, dob } = await captureTextDetails(binaryImg);
    const { age, sex } = await captureFaceDetails(binaryImg);
    setDocumentType(docType);
    setUsername(name);
    setBirthdate(dob);
    setAgeRange(age);
    setGender(sex);
    setProgressValue(100);
    setLoading(false);
    if (name && dob) {
      setErrorMessage(null);
      setAlertMessage(LANGUAGES[state.user.locale].KYC.Documents.Success);
      setCompleted(true);
    } else {
      setErrorMessage(LANGUAGES[state.user.locale].KYC.Documents.Fail);
      setCompleted(false);
    }
    setShowWebcam(false);
    setShowUpload(false);
    setShowProgress(false);
  };

  const handleCapture = () => {
    setErrorMessage(null);
    setLoading(true);
    setShowProgress(true);
    setProgressValue(5);
    const imgBase64Strg = webcamRef.current.getScreenshot(screenShotProps);
    handleProcess(imgBase64Strg);
  };

  async function handleFile(e) {
    setErrorMessage(null);
    setLoading(true);
    setShowProgress(true);
    setProgressValue(5);
    const f = e.target.files[0];
    setFileName(f.name);
    const imgBase64Strg = await ConvertBase64(f);
    handleProcess(imgBase64Strg);
  }

  function startCameraTest() {
    setProgressValue(0);
    setShowWebcam(true);
    setShowUpload(false);
    setAlertMessage(LANGUAGES[state.user.locale].KYC.Documents.ShowDocument);
  }

  function startUploadTest() {
    setProgressValue(0);
    setShowWebcam(false);
    setShowUpload(true);
    setAlertMessage(LANGUAGES[state.user.locale].KYC.Documents.UploadDocument);
  }

  const renderButtons = () => (
    <div className="w-6/12 flex flex-row justify-around">
      <Button
        text={LANGUAGES[state.user.locale].KYC.Documents.Camera}
        handler={() => {
          setShowUpload(false);
          setShowWebcam(true);
          startCameraTest();
        }}
      />
      <Button
        text={LANGUAGES[state.user.locale].KYC.Documents.Upload}
        handler={() => {
          setShowUpload(true);
          setShowWebcam(false);
          startUploadTest();
        }}
      />
    </div>
  );

  const renderWebCam = () => (
    <Webcam
      ref={webcamRef}
      height={450}
      width={800}
      videoConstraints={videoConstraintsProps}
      screenshotFormat="image/jpeg"
      audio={false}
    />
  );

  const renderFileUpload = () => (
    <>
      <input
        type="file"
        id="files"
        className="hidden"
        onChange={(e) => handleFile(e)}
        accept=".jpg,.jpeg,.png,image/png,image/jpeg"
        disabled={progressValue > 0}
      />

      <label
        htmlFor="files"
        className="relative file:hidden bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
      >
        <i className="bx bx-file-find text-2xl absolute top-1 right-1" />
        {fileName}
      </label>
    </>
  );

  return (
    <>
      <div className="mt-4 flex flex-col items-center">
        <Title
          text={LANGUAGES[state.user.locale].KYC.Documents.Title}
          size="text-2xl"
        />
        <Title text={alertMessage} color="text-black" />
        <Title text={errorMessage} color="text-red-500" />
        {!showWebcam &&
          !showUpload &&
          !completed &&
          progressValue < 100 &&
          renderButtons()}
        <div className="relative w-full">
          {showWebcam && !showUpload && renderWebCam()}
          {!showWebcam && showUpload && renderFileUpload()}
          {loading && (
            <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
        {showProgress && progressValue < 100 && (
          <ProgressBar value={progressValue} />
        )}
        {showWebcam && !showProgress && (
          <Button
            text={LANGUAGES[state.user.locale].KYC.Documents.Validate}
            handler={() => handleCapture()}
            full
          />
        )}
        {progressValue === 100 && completed && (
          <Button
            text={LANGUAGES[state.user.locale].KYC.Documents.Continue}
            handler={() => handleSetTab(3, 4)}
          />
        )}
      </div>
    </>
  );
}
