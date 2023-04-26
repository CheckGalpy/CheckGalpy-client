import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setCurrentBookmarkId } from "../../redux/currentBookmarkIdSlice";
import { setBookmarkTabStatus } from "../../redux/bookmarkTabStatusSlice";
import styles from "./styles";

import ListSelectionTab from "../../components/ListSelectionTab/ListSelectionTab";
import SearchBox from "../../components/SearchBox.js/SearchBox";
import SortController from "../../components/SortController/SortController";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import EditableCard from "../../components/EditableCard/EditableCard";
import NonEditableCard from "../../components/NonEditableCard/NonEditableCard";

export default function Bookmark() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );
  const bookmarkTabStatus = useSelector(
    (state) => state.bookmarkTabStatus.bookmarkTabStatus,
  );

  const scrollViewRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [filteredBookmarkList, setFilteredBookmarkList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookmarkIdToDelete, setBookmarkIdToDelete] = useState(null);
  const [collectStatusList, setCollectStatusList] = useState({});
  const [cardExpasionStatusList, setCardExpasionStatusList] = useState({});

  useEffect(() => {
    getAllMyBookmarks();
  }, [bookmarkTabStatus]);

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
    if (bookmarkTabStatus === "MY") {
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
    } else if (bookmarkTabStatus === "collected") {
      try {
        const url = `${API_URI}/api/collects/${currentUserId}/collected`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const bookmarkList = await response.json();
        const sortedBookmarkList = bookmarkList.reverse();
        setBookmarkList(sortedBookmarkList);

        const collectStatus = sortedBookmarkList.reduce((acc, bookmark) => {
          acc[bookmark._id] = true;
          return acc;
        }, {});
        setCollectStatusList(collectStatus);

        const cardExpansionStatus = sortedBookmarkList.reduce(
          (acc, bookmark) => {
            acc[bookmark._id] = false;
            return acc;
          },
          {},
        );
        setCardExpasionStatusList(cardExpansionStatus);
      } catch (error) {
        console.warn(error);
      }
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

  const handleTabSwitch = (tab) => {
    dispatch(setBookmarkTabStatus(tab));
    setSearchKeyword("");
    setIsSearching(false);
    scrollToTop();
  };

  const handleSortToggle = () => {
    setBookmarkList(bookmarkList.reverse());
    setFilteredBookmarkList(filteredBookmarkList.reverse());
    setSortOrder(sortOrder === "최신순" ? "오래된순" : "최신순");
    scrollToTop();
  };

  const handleBookmarkCardPress = (bookmarkId) => {
    dispatch(setCurrentBookmarkId(bookmarkId));
    navigate("BookmarkDetail");
  };

  const handleDeleteButtonPress = (bookmarkId) => {
    setBookmarkIdToDelete(bookmarkId);
    setIsModalVisible(true);
  };

  const handleDeleteBookmark = async () => {
    try {
      const response = await fetch(
        `${API_URI}/api/bookmarks/${bookmarkIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 204) {
        setIsModalVisible(false);
        getAllMyBookmarks();
      }
    } catch (error) {
      console.error("책갈피 삭제에 실패하였습니다: ", error);
    }
  };

  const handleCollectButtonPress = async (bookmarkId) => {
    try {
      const isCollected = collectStatusList[bookmarkId];
      const url = `${API_URI}/api/collects/${
        isCollected ? "discard" : "collect"
      }`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectorId: currentUserId,
          collectedBookmarkId: bookmarkId,
        }),
      });

      if (response.status === 201 || response.status === 200) {
        setCollectStatusList({
          ...collectStatusList,
          [bookmarkId]: !isCollected,
        });
      }
    } catch (error) {
      console.error("책갈피 즐겨찾기 정보 업데이트에 실패하였습니다: ", error);
    }
  };

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
        placeholder="찾는 책갈피가 있으신가요?"
      />
      <View style={styles.controllerContainer}>
        <ListSelectionTab handleTabSwitch={handleTabSwitch} />
        <SortController
          sortOrder={sortOrder}
          handleSortToggle={handleSortToggle}
        />
      </View>
      <View style={styles.cardContainer}>
        <ScrollView ref={scrollViewRef}>
          {(isSearching ? filteredBookmarkList : bookmarkList).map(
            (bookmark, index) => {
              return bookmarkTabStatus === "MY" ? (
                <EditableCard
                  key={index}
                  bookmark={bookmark}
                  isSearching={isSearching}
                  searchKeyword={searchKeyword}
                  handleBookmarkCardPress={handleBookmarkCardPress}
                  handleDeleteButtonPress={handleDeleteButtonPress}
                />
              ) : (
                <NonEditableCard
                  key={index}
                  bookmark={bookmark}
                  isSearching={isSearching}
                  searchKeyword={searchKeyword}
                  collectStatusList={collectStatusList}
                  cardExpasionStatusList={cardExpasionStatusList}
                  handleCollectButtonPress={handleCollectButtonPress}
                  handleExpansionButtonPress={handleExpansionButtonPress}
                />
              );
            },
          )}
        </ScrollView>
      </View>
    </View>
  );
}
