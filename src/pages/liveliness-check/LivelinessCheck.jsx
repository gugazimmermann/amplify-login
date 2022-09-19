import { useState, useEffect, useRef, useContext } from "react";
import Webcam from "react-webcam";
import { Buffer } from "buffer";
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";
import { Title, Button, ProgressBar, Spinner } from "../../components";
import { AppContext } from "../../context";
import { LANGUAGES } from "../../constants";
import gesturesJson from "./gestures.json";

const videoConstraintsProps = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const screenShotProps = {
  width: 800,
  height: 450,
};

export default function LivelinessCheck({ rekognition, handleSetTab, handleSetImage }) {
  const { state } = useContext(AppContext);
  const webcamRef = useRef(null);
  const [gestures, setGestures] = useState(null);
  const [gesture, setGesture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    LANGUAGES[state.user.locale].KYC.Liveliness.SubTitle
  );
  const [errorMessage, setErrorMessage] = useState();
  const [showProgress, setShowProgress] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const g = [];
    g.push(gesturesJson[0]);
    gesturesJson.shift();
    gesturesJson.sort(() => Math.random() - 0.5);
    setGestures(g.concat(gesturesJson.slice(0, 2)));
  }, []);

  useEffect(() => {
    if (gesture !== null) {
      const description = gestures.find((g) => g.name === gesture).description[
        state.user.locale
      ];
      setAlertMessage(description);
    }
  }, [gesture, gestures, state.user.locale]);

  const updateGestureState = () => {
    const g = gestures.map((x) => x);
    g.shift();
    setGestures(g);
    if (g.length === 2) {
      setProgressValue(33);
      setGesture(g[0].name);
    } else if (g.length === 1) {
      setProgressValue(66);
      setGesture(g[0].name);
    } else {
      setProgressValue(100);
      setShowWebcam(false);
      gesturesJson.sort(() => Math.random() - 0.5);
      setGestures(gesturesJson.slice(0, 3));
    }
  };

  const validateGesture = (gesture, data) => {
    const failedValidate = {
      result: false,
      message: LANGUAGES[state.user.locale].KYC.Liveliness.FailedValidate,
    };
    if (!data.FaceDetails.length) {
      return {
        result: false,
        message: LANGUAGES[state.user.locale].KYC.Liveliness.NoFace,
      };
    }
    if (data.length > 1) {
      return {
        result: false,
        message: LANGUAGES[state.user.locale].KYC.Liveliness.MoreThanOneFace,
      };
    }
    if (gesture === "smile") {
      if (data.FaceDetails[0]?.Smile?.Value === true) {
        return {
          result: true,
          message: LANGUAGES[state.user.locale].KYC.Liveliness.ThankYou,
        };
      } else {
        return failedValidate;
      }
    } else if (gesture === "lookRight") {
      if (data.FaceDetails[0]?.Pose?.Yaw <= -30) {
        return {
          result: true,
          message: LANGUAGES[state.user.locale].KYC.Liveliness.ThankYou,
        };
      } else {
        return failedValidate;
      }
    } else if (gesture === "lookLeft") {
      if (data.FaceDetails[0]?.Pose?.Yaw >= 30) {
        return {
          result: true,
          message: LANGUAGES[state.user.locale].KYC.Liveliness.ThankYou,
        };
      } else {
        return failedValidate;
      }
    } else if (gesture === "mouthOpen") {
      if (data.FaceDetails[0]?.MouthOpen?.Value === true) {
        return {
          result: true,
          message: LANGUAGES[state.user.locale].KYC.Liveliness.ThankYou,
        };
      } else {
        return failedValidate;
      }
    } else if (gesture === "eyesClose") {
      if (data.FaceDetails[0]?.EyesOpen?.Value === false) {
        return {
          result: true,
          message: LANGUAGES[state.user.locale].KYC.Liveliness.ThankYou,
        };
      } else {
        return failedValidate;
      }
    }
    return {
      result: false,
      message: LANGUAGES[state.user.locale].KYC.Liveliness.Unkown,
    };
  };

  const requestGesture = async () => {
    setLoading(true);
    const imgBase64Strg = webcamRef.current.getScreenshot(screenShotProps);
    const buffer = new Buffer.from(
      imgBase64Strg.split(";base64,").pop(),
      "base64"
    );
    const detectFaces = await rekognition.send(
      new DetectFacesCommand({
        Attributes: ["ALL"],
        Image: { Bytes: buffer },
      })
    );
    if (detectFaces?.$response?.error) {
      setLoading(false);
      setErrorMessage(detectFaces.$response.error.message);
    } else {
      let res = validateGesture(gesture, detectFaces);
      if (res.result) {
        if (gesture === 'smile' && handleSetImage) handleSetImage(imgBase64Strg)
        setErrorMessage();
        setAlertMessage(res.message);
        setLoading(false);
        updateGestureState();
      } else {
        setErrorMessage(res.message);
        setLoading(false);
      }
    }
  };

  function startLiveliness() {
    setShowProgress(true);
    setShowWebcam(true);
    setGesture(gestures[0].name);
  }

  return (
    <>
      <div className="mt-4 flex flex-col items-center">
        <Title
          text={LANGUAGES[state.user.locale].KYC.Liveliness.Title}
          size="text-2xl"
        />
        <Title text={alertMessage} color="text-black" />
        <Title text={errorMessage} color="text-red-500" />
        {!showProgress && (
          <div className="w-2/12 text-center">
            <Button text="Start" handler={() => startLiveliness()} />
          </div>
        )}
        <div className="mt-4">
          {showWebcam && (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                height={450}
                width={800}
                videoConstraints={videoConstraintsProps}
                screenshotFormat="image/jpeg"
                audio={false}
              />
              {loading && (
                <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
          )}
          {showProgress && progressValue < 100 && (
            <>
              <ProgressBar value={progressValue} />
              <Button
                text={LANGUAGES[state.user.locale].KYC.Liveliness.Validate}
                handler={() => requestGesture()}
                full
              />
            </>
          )}
          {progressValue === 100 && (
            <Button
              text={LANGUAGES[state.user.locale].KYC.Liveliness.Continue}
              handler={() => handleSetTab(2, 3)}
            />
          )}
        </div>
      </div>
    </>
  );
}
