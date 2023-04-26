import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import transformTimeStamp from "../../utils/formatTimeStamp";
import styles from "./styles";
import EditableContent from "../../components/EditableContent/EditableContent";
import EditableHashtag from "../../components/EditableHashtag/EditableHashtag";

export default function BookmarkDetail() {
  const { navigate } = useNavigation();

  const currentBookmarkId = useSelector(
    (state) => state.currentBookmarkId.currentBookmarkId,
  );

  const [dateString, setDateString] = useState(null);
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const getBookmark = async () => {
      const response = await fetch(
        `${API_URI}/api/bookmarks/${currentBookmarkId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const bookmark = await response.json();
      const date = new Date(bookmark?.createdAt);

      setDateString(transformTimeStamp(date));
      setContent(bookmark?.content);
      setHashtags(bookmark?.hashtags);
    };

    getBookmark();
  }, [currentBookmarkId]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleHashtagAdd = () => {
    if (
      hashtags.length === 0 ||
      hashtags[hashtags.length - 1] !== "태그를 입력하세요"
    ) {
      setHashtags([...hashtags, "태그를 입력하세요"]);
    }
  };

  const handleHashtagChange = (index, newText) => {
    const newTags = [...hashtags];
    newTags[index] = newText;
    setHashtags(newTags);
  };

  const handleUpdateBookmark = async () => {
    const response = await fetch(
      `${API_URI}/api/bookmarks/${currentBookmarkId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, hashtags }),
      },
    );

    if (response.status === 200) {
      navigate("Bookmark");
    } else {
      Alert.alert("책갈피 수정에 실패하였습니다");
    }
  };

  const handleHashtagDelete = (index) => {
    const newTags = [...hashtags];
    newTags.splice(index, 1);
    setHashtags(newTags);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.dateString}>{dateString}</Text>
          <EditableContent
            content={content}
            onContentChange={handleContentChange}
          />
          <View style={styles.hashtagContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleHashtagAdd}
            >
              <Text>+</Text>
            </TouchableOpacity>
            {hashtags.map((tag, index) => (
              <EditableHashtag
                key={index}
                tag={tag}
                index={index}
                onTagChange={handleHashtagChange}
                onTagDelete={handleHashtagDelete}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdateBookmark}
        >
          <Text>책갈피 업데이트</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
