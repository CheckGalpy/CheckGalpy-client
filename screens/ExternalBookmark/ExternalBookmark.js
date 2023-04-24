import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import transformTimeStamp from "../../utils/formatTimeStamp";
import styles from "./styles";

import SearchBox from "../../components/SearchBox.js/SearchBox";
import HighlightedContent from "../../components/HighlightedContent/HighlightedContent";

export default function ExternalBookmark() {
  const accessedUser = useSelector((state) => state.accessedUser.accessedUser);

  const scrollViewRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredBookmarkList, setFilteredBookmarkList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [cardPinnedStatusList, setCardPinnedStatusList] = useState({});
  const [cardExpasionStatusList, setCardExpasionStatusList] = useState({});

  useEffect(() => {
    getAllMyBookmarks();
  }, [refresh]);

  useEffect(() => {
    if (searchKeyword) {
      handleSearch();
    } else {
      setIsSearching(false);
    }
  }, [searchKeyword]);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, []),
  );

  const getAllMyBookmarks = async () => {
    try {
      const url = `${API_URI}/api/bookmarks/creator?creatorId=${accessedUser.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bookmarkList = await response.json();
      const sortedBookmarkList = bookmarkList.reverse();
      setBookmarkList(sortedBookmarkList);

      const cardExpansionStatus = sortedBookmarkList.reduce((acc, bookmark) => {
        acc[bookmark._id] = false;
        return acc;
      }, {});
      setCardExpasionStatusList(cardExpansionStatus);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSearch = () => {
    const filteredBookmarkList = bookmarkList.filter(
      (bookmark) =>
        bookmark.hashtags.includes(searchKeyword) ||
        bookmark.content.includes(searchKeyword),
    );
    setFilteredBookmarkList(filteredBookmarkList);
    setIsSearching(true);
    scrollToTop();
  };

  // const handlePinButtonPress = (bookmarkId) => {
  //   const isPinned = cardExpasionStatusList[bookmarkId];

  //   setCardExpasionStatusList({
  //     ...cardExpasionStatusList,
  //     [bookmarkId]: !isExpanded,
  //   });
  // };

  const handleExpansionButtonPress = (bookmarkId) => {
    const isExpanded = cardExpasionStatusList[bookmarkId];
    setCardExpasionStatusList({
      ...cardExpasionStatusList,
      [bookmarkId]: !isExpanded,
    });
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
  };

  return (
    <View style={styles.container}>
      <SearchBox
        setSearchKeyword={setSearchKeyword}
        placeholder="찾는 책갈피가 있으신가요?"
      />
      <View style={styles.cardContainer}>
        <ScrollView ref={scrollViewRef}>
          {(isSearching ? filteredBookmarkList : bookmarkList).map(
            (bookmark, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.headerConatainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.dateString}>
                      {transformTimeStamp(new Date(bookmark.createdAt))}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.pinButtonContainer}
                    // onPress={() => handlePinButtonPress(bookmark._id)}
                  >
                    {!isSearching && (
                      <Image
                        source={
                          // cardExpasionStatusList[bookmark._id]
                          require("../../assets/images/button-unpin.png")
                          // : require("../../assets/images/button-pin.png")
                        }
                        style={styles.pinButton}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {isSearching ? (
                  <HighlightedContent
                    text={bookmark.content}
                    keyword={searchKeyword}
                  />
                ) : (
                  <Text
                    style={styles.content}
                    numberOfLines={
                      cardExpasionStatusList[bookmark._id] ? undefined : 7
                    }
                  >
                    {bookmark.content}
                  </Text>
                )}
                <View style={styles.cardBottomConntainer}>
                  <View style={styles.hashtagContainer}>
                    {bookmark.hashtags?.map((tag, index) => (
                      <Text
                        style={
                          tag !== searchKeyword
                            ? styles.hashtag
                            : styles.highlightedHashtag
                        }
                        key={index}
                      >
                        #{tag}
                      </Text>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.expandButtonContainer}
                    onPress={() => handleExpansionButtonPress(bookmark._id)}
                  >
                    {!isSearching && (
                      <Image
                        source={
                          cardExpasionStatusList[bookmark._id]
                            ? require("../../assets/images/button-shrink.png")
                            : require("../../assets/images/button-expand.png")
                        }
                        style={styles.expandButton}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ),
          )}
        </ScrollView>
      </View>
    </View>
  );
}
