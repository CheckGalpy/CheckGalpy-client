import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setBookmarkId } from "../../redux/currentBookmarkSlice";
import transformTimeStamp from "../../utils/formatTimeStamp";
import styles from "./styles";

export default function Bookmark() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const [bookmarkList, setBookmarkList] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");

  useEffect(() => {
    const getAllMyBookmarks = async () => {
      try {
        const url = `${API_URI}/api/bookmark/creator?creatorId=${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const bookmarkList = await response.json();
        setBookmarkList(bookmarkList);
      } catch (error) {
        console.warn(error);
      }
    };
    getAllMyBookmarks();
  }, [activeTab]);

  const handleSearch = () => {
    const filteredBookmarks = bookmarkList.filter((bookmark) =>
      bookmark.hashtags.includes(query),
    );
    setBookmarkList(filteredBookmarks);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSortToggle = () => {
    const reversedBookmarkList = bookmarkList.reverse();
    setBookmarkList(reversedBookmarkList);

    if (sortOrder === "최신순") {
      setSortOrder("오래된순");
    } else {
      setSortOrder("최신순");
    }
  };

  const handleBookmarkCardPress = (bookmarkId) => {
    dispatch(setBookmarkId(bookmarkId));
    navigate("BookmarkDetail");
  };

  const handleDeleteBookmark = async (bookmarkId) => {
    const response = await fetch(`${API_URI}/api/bookmark/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      Alert.alert("책갈피가 삭제되었습니다!");
    } else {
      Alert.alert("책갈피 삭제에 실패하였습니다");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../assets/images/icon-lense.png")}
          style={styles.lenseIcon}
          resizeMode="contain"
        />
        <TextInput
          placeholder="해시태그를 검색 해보세요"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.controllerContainer}>
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "전체" && styles.activeTab]}
            onPress={() => handleTabSwitch("전체")}
          >
            <Text style={styles.tabText}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "좋아요" && styles.activeTab]}
            onPress={() => handleTabSwitch("좋아요")}
          >
            <Text style={styles.tabText}>좋아요</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterInnerContainer}
            onPress={handleSortToggle}
          >
            <Text style={styles.filterText}>{sortOrder}</Text>
            <Image
              source={require("../../assets/images/icon-filter.png")}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <ScrollView>
          {bookmarkList.map((bookmark, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => handleBookmarkCardPress(bookmark._id)}
              >
                <Text style={styles.dateString}>
                  {transformTimeStamp(new Date(bookmark.createdAt))}
                </Text>
                <Text style={styles.content}>{bookmark.content}</Text>
                <View style={styles.cardBottomConntainer}>
                  <View style={styles.hashtagContainer}>
                    {bookmark.hashtags.map((tag, index) => (
                      <Text style={styles.hashtag} key={index}>
                        #{tag}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.deleteButtonContainer}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteBookmark(bookmark._id)}
                    >
                      <Text style={styles.deleteText}>삭제</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
