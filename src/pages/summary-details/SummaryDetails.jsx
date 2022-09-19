import { useCallback, useContext, useEffect, useState } from "react";
import { Buffer } from "buffer";
import { CompareFacesCommand } from "@aws-sdk/client-rekognition";
import { Title, Spinner } from "../../components";
import { LANGUAGES } from "../../constants";
import { AppContext } from "../../context";

export default function SummaryDetails({
  rekognition,
  handleSetTab,
  userData,
  image1,
  image2,
}) {
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [faceSimilarity, setFaceSimilarity] = useState(-1);

  const compareFaces = useCallback(async () => {
    setLoading(true);
    const sourceBinaryImg = new Buffer.from(
      image1.split(";base64,").pop(),
      "base64"
    );
    const targetBinaryImg = new Buffer.from(
      image2.split(";base64,").pop(),
      "base64"
    );
    const compareFaces = await rekognition.send(
      new CompareFacesCommand({
        SourceImage: { Bytes: sourceBinaryImg },
        TargetImage: { Bytes: targetBinaryImg },
        QualityFilter: "NONE",
        SimilarityThreshold: 30,
      })
    );
    if (compareFaces.FaceMatches.length === 0) {
      setErrorMessage("Did not pass Face similarity test. Try again!");
      setFaceSimilarity(0);
    }
    setFaceSimilarity(compareFaces.FaceMatches[0].Similarity);
    if (compareFaces.FaceMatches[0].Similarity > 80) {
      setAlertMessage(" You have successfully completed the KYC");
    } else {
      setErrorMessage("Did not pass Face similarity test. Try again !");
    }
    setLoading(false);
  }, [image1, image2, rekognition]);

  useEffect(() => {
    compareFaces();
  }, [compareFaces]);

  return (
    <>
      <div className="mt-4 text-center">
        {loading && (
          <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        <Title
          text={LANGUAGES[state.user.locale].KYC.Summary.Title}
          size="text-2xl"
        />
        <Title text={alertMessage} color="text-black" />
        <Title text={errorMessage} color="text-red-500" />
        <pre>{JSON.stringify(userData, undefined, 2)}</pre>
        <pre>{`Face similarity: ${faceSimilarity}`}</pre>
      </div>
    </>
  );
}
