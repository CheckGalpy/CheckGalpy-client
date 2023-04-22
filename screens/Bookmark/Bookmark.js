import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setCurrentBookmarkId } from "../../redux/currentBookmarkIdSlice";
import transformTimeStamp from "../../utils/formatTimeStamp";
import styles from "./styles";

import SearchBox from "../../components/SearchBox.js/SearchBox";
import SortController from "../../components/SortController/SortController";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function Bookmark() {
  const { navigate } = useNavigation();

  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const scrollViewRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredBookmarkList, setFilteredBookmarkList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookmarkIdToDelete, setBookmarkIdToDelete] = useState(null);

  useEffect(() => {
    getAllMyBookmarks();
  }, [activeTab]);

  useEffect(() => {
    getAllMyBookmarks();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, []),
  );

  const getAllMyBookmarks = async () => {
    try {
      const url = `${API_URI}/api/bookmarks/creator?creatorId=${currentUserId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bookmarkList = await response.json();
      setBookmarkList(bookmarkList.reverse());
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSearch = () => {
    if (!searchKeyword) setIsSearching(false);

    const filteredBookmarkList = bookmarkList.filter(
      (bookmark) =>
        bookmark.hashtags.includes(searchKeyword) ||
        bookmark.content.includes(searchKeyword),
    );
    setIsSearching(true);
    setFilteredBookmarkList(filteredBookmarkList);
    scrollToTop();
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    scrollToTop();
  };

  const handleSortToggle = () => {
    setBookmarkList(bookmarkList.reverse());
    setFilteredBookmarkList(filteredBookmarkList.reverse());
    setSortOrder(sortOrder === "최신순" ? "오래된순" : "최신순");
    scrollToTop();
  };

  const handleBookmarkCardPress = (bookmarkId) => {
    setCurrentBookmarkId(bookmarkId);
    navigate("BookmarkDetail");
  };

  const handleDeleteButtonPress = (bookmarkId) => {
    setBookmarkIdToDelete(bookmarkId);
    setIsModalVisible(true);
  };

  const handleDeleteBookmark = async () => {
    const response = await fetch(
      `${API_URI}/api/bookmarks/${bookmarkIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 204) {
      Alert.alert("책갈피 삭제에 실패하였습니다");
    }

    setIsModalVisible(false);
    getAllMyBookmarks();
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <ConfirmModal
          isModalVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          handleDeleteBookmark={() => handleDeleteBookmark()}
        />
      )}
      <SearchBox
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearch={handleSearch}
        placehoolder="찾는 책갈피가 있으신가요?"
      />
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
        <SortController
          sortOrder={sortOrder}
          handleSortToggle={handleSortToggle}
        />
      </View>
      <View style={styles.cardContainer}>
        <ScrollView ref={scrollViewRef}>
          {(isSearching ? filteredBookmarkList : bookmarkList).map(
            (bookmark, index) => (
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
                      {bookmark.hashtags?.map((tag, index) => (
                        <Text style={styles.hashtag} key={index}>
                          #{tag}
                        </Text>
                      ))}
                    </View>
                    <View style={styles.deleteButtonContainer}>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteButtonPress(bookmark._id)}
                      >
                        <Text style={styles.deleteText}>삭제</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ),
          )}
        </ScrollView>
      </View>
    </View>
  );
}
