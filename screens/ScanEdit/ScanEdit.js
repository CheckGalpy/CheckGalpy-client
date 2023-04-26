import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  REACT_APP_GOOGLE_CLOUD_VISION_API_KRY,
  REACT_APP_API_URI as API_URI,
} from "@env";

import { setCurrentBookmarkId } from "../../redux/currentBookmarkIdSlice";
import { setScannedText } from "../../redux/scannedTextSlice";

import styles from "./styles";

export default function ScanEdit() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const scannedImage = useSelector((state) => state.scannedImage.scannedImage);
  const scannedTextStored = useSelector(
    (state) => state.scannedText.scannedText,
  );
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const extractText = async () => {
    const body = {
      requests: [
        {
          image: { content: scannedImage },
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
    const data = await response.json();
    const textExtracted = data.responses[0].textAnnotations[0].description;
    return textExtracted;
  };

  const saveBookmarkData = async (textExtracted) => {
    try {
      const createdAt = new Date();
      const bookmarkInfo = {
        creatorId: currentUserId,
        content: textExtracted,
        createdAt,
        hashtags: [],
        book: {},
      };

      const response = await fetch(`${API_URI}/api/bookmarks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkInfo),
      });

      const bookmarkId = await response.json();
      dispatch(setCurrentBookmarkId(bookmarkId));

      return response.status;
    } catch (error) {
      console.warn(error);
    }
  };

  const handleBookmarkGeneration = async () => {
    let textExtracted = await extractText();

    if (scannedTextStored) {
      textExtracted = scannedTextStored + " " + textExtracted;
    }

    const result = await saveBookmarkData(textExtracted);

    if (result === 201) {
      dispatch(setScannedText(""));
      navigate("BookmarkDetail");
    } else {
      Alert.alert("책갈피 생성에 실패하였습니다");
      navigate("Scan");
    }
  };

  const handleRescan = async () => {
    navigate("Scan");
  };

  const handleConsecutiveScan = async () => {
    let textExtracted = await extractText();

    if (scannedTextStored) {
      textExtracted = scannedTextStored + " " + textExtracted;
    }
    dispatch(setScannedText(textExtracted));
    navigate("Scan");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${scannedImage}` }}
          style={styles.pictureFrame}
        />
        <View style={styles.controlArea}>
          <View style={styles.controlAreaLeft}>
            <TouchableOpacity onPress={handleConsecutiveScan}>
              <Image
                source={require("../../assets/images/button-consecutive-scan.png")}
                style={styles.albumThumbnail}
                resizeMode="contain"
              />
              <Text style={styles.text}>연사모드</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controlAreaCenter}>
            <TouchableOpacity onPress={handleRescan}>
              <Image
                source={require("../../assets/images/button-rescan.png")}
                style={styles.confirmButton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.controlAreaRight}>
            <TouchableOpacity onPress={handleBookmarkGeneration}>
              <Image
                source={require("../../assets/images/button-confirm.png")}
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
