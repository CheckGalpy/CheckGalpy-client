import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { REACT_APP_API_URI as API_URI } from "@env";

import transformTimeStamp from "../../utils/formatTimeStamp";
import styles from "./styles";

export default function BookmarkDetailReadOnly() {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.dateString}>{dateString}</Text>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.hashtagContainer}>
            {hashtags.map((tag, index) => (
              <Text key={index} style={styles.hashtag}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
