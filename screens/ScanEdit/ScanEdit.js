import { REACT_APP_GOOGLE_CLOUD_VISION_API_KRY } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { setTextInfo } from "../../redux/textSlice";
import styles from "./styles";

export default function ScanEdit() {
  const albumThumbnail = require("../../assets/images/album-thumbnail.png");
  const confirmScan = require("../../assets/images/button-confirm.png");

  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const pictureInfo = useSelector((state) => state.picture.pictureInfo);

  const handleOCR = async () => {
    const body = {
      requests: [
        {
          image: { content: pictureInfo },
          features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 }],
        },
      ],
    };

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_GOOGLE_CLOUD_VISION_API_KRY}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const parsed = await response.json();

    const OCRed = parsed.responses[0].textAnnotations[0].description;

    dispatch(setTextInfo(OCRed));
    navigate("Bookmark");
  };

  const handleRescan = () => {
    navigate("Scan");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${pictureInfo}` }}
          style={styles.pictureFrame}
        />
        <View style={styles.controlArea}>
          <View style={styles.controlAreaLeft}>
            <TouchableOpacity onPress={() => navigate("Album")}>
              <Image
                source={albumThumbnail}
                style={styles.albumThumbnail}
                resizeMode="contain"
              />
              <Text style={styles.text}>앨범에서 선택</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controlAreaCenter}>
            <TouchableOpacity
              style={styles.shootButton}
              onPress={handleRescan}
            />
          </View>
          <View style={styles.controlAreaRight}>
            <TouchableOpacity onPress={handleOCR}>
              <Image
                source={confirmScan}
                style={styles.confirmButton}
                resizeMode="contain"
              />
              <Text style={styles.text}>책갈피 생성</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
