import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  REACT_APP_GOOGLE_CLOUD_VISION_API_KRY,
  REACT_APP_API_URI as API_URI,
} from "@env";

import { setBookmarkId } from "../../redux/currentBookmarkSlice";
import styles from "./styles";

export default function ScanEdit() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const pictureInfo = useSelector((state) => state.picture.pictureInfo);

  const handleTextExtraction = async () => {
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
    const data = await response.json();
    const textExtracted = data.responses[0].textAnnotations[0].description;
    const result = await saveBookmark(textExtracted);

    if (result === 201) {
      navigate("BookmarkDetail");
    } else {
      Alert.alert("책갈피 생성에 실패하였습니다");
      navigate("Scan");
    }
  };

  const saveBookmark = async (textExtracted) => {
    try {
      const createdAt = new Date();
      const bookmarkInfo = {
        creatorId: userId,
        content: textExtracted,
        createdAt,
        hashtags: [],
        book: {},
      };

      const response = await fetch(`${API_URI}/api/bookmark/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkInfo),
      });

      const bookmarkId = await response.json();
      dispatch(setBookmarkId(bookmarkId));

      return response.status;
    } catch (error) {
      console.warn(error);
    }
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
                source={require("../../assets/images/album-thumbnail.png")}
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
            <TouchableOpacity onPress={handleTextExtraction}>
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
