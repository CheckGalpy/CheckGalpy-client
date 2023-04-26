import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setCurrentBookmarkId } from "../../redux/currentBookmarkIdSlice";
import { setBookmarkTabStatus } from "../../redux/bookmarkTabStatusSlice";
import styles from "./styles";

import HashtagFrequencyGraph from "../../components/Chart/Chart";
import CarouselComponent from "../../components/Carousal/Carousal";

export default function Dashboard() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const scrollViewRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [myHashtags, setMyHashtags] = useState({});
  const [recommendedBookmark, setRecommendedBookmark] = useState([]);
  const [followingStatus, setFollowingStatus] = useState();
  const [followerStatus, setFollowerStatus] = useState();
  const [collectedStatus, setCollectedStatus] = useState();
  const [collectedByOthersStatus, setCollectedByOthersStatus] = useState();
  const [currentCollectStatesList, setCurrentCollectStatesList] = useState({});
  const [bookmarkStatus, setBookmarkStatus] = useState();

  useEffect(() => {
    getRecommendedBookmarks();
    getFollowerStatus();
    getCollectedStatus();
    getBookmarkStatus();
    scrollToTop();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, []),
  );

  const getRecommendedBookmarks = async () => {
    const similarUserList = await getSimilarUserList();
    const followingList = await getFollowingList();

    const nonFollowingSimilarUsers = similarUserList.filter((similarUser) => {
      return !followingList.some(
        (following) => following._id === similarUser.userId,
      );
    });

    const recommendedBookmarkList = await getBookmarkNonFollowingSimilarUsers(
      nonFollowingSimilarUsers,
    );
    setRecommendedBookmark(recommendedBookmarkList);
    getCurrentCollectStatesList(recommendedBookmarkList);
  };

  const getSimilarUserList = async () => {
    try {
      const url = `${API_URI}/api/similarUsers/${currentUserId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setMyHashtags(result.hashtagsFrequency);
      return result.similarUser;
    } catch (error) {
      console.warn(error);
    }
  };

  const getFollowingList = async () => {
    try {
      const url = `${API_URI}/api/follows/${currentUserId}/following`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const followingList = await response.json();

      setFollowingStatus(followingList.length);
      return followingList;
    } catch (error) {
      console.warn(error);
    }
  };

  const getBookmarkNonFollowingSimilarUsers = async (similarUsers) => {
    const maxUsers = 5;

    try {
      const bookmarks = [];
      for (let i = 0; i < Math.min(similarUsers.length, maxUsers); i++) {
        const similarUserId = similarUsers[i].userId;
        const url = `${API_URI}/api/bookmarks/creator?creatorId=${similarUserId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userBookmarks = await response.json();

        if (userBookmarks.length > 0) {
          bookmarks.push(userBookmarks[0]);
        }
      }

      return bookmarks;
    } catch (error) {
      console.warn(error);
    }
  };

  const getCurrentCollectStatesList = async (recommendedBookmarkList) => {
    const collectStates = {};
    for (const bookmark of recommendedBookmarkList) {
      try {
        const url = `${API_URI}/api/collects/${currentUserId}/${bookmark._id}/exists`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        collectStates[bookmark._id] = result.exists;
      } catch (error) {
        console.warn(error);
      }
      setCurrentCollectStatesList(collectStates);
    }
  };

  const getFollowerStatus = async () => {
    try {
      const url = `${API_URI}/api/follows/${currentUserId}/follower`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("팔로워 정보를 받아오는데 실패하였습니다.");
      }

      const followerList = await response.json();
      setFollowerStatus(followerList.length);
    } catch (error) {
      console.warn(error);
    }
  };

  const getBookmarkStatus = async () => {
    try {
      const url = `${API_URI}/api/bookmarks/creator?creatorId=${currentUserId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bookmarkList = await response.json();
      setBookmarkStatus(bookmarkList.length);
      getCollectedByOthersStatus(bookmarkList);

      dispatch(setCurrentBookmarkId(bookmarkList[bookmarkList.length - 1]._id));
    } catch (error) {
      console.warn(error);
    }
  };

  const getCollectedStatus = async () => {
    try {
      const url = `${API_URI}/api/collects/${currentUserId}/collected`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("즐겨찾기 정보를 받아오는데 실패하였습니다.");
      }

      const collectedList = await response.json();
      setCollectedStatus(collectedList.length);
    } catch (error) {
      console.warn(error);
    }
  };

  const getCollectedByOthersStatus = async (bookmarkList) => {
    try {
      let countCollectedByOthers = 0;

      for (const bookmark of bookmarkList) {
        const url = `${API_URI}/api/collects/${bookmark._id}/exists`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("내 책갈피의 수집정보를 받아오는데 실패하였습니다.");
        }

        const result = await response.json();
        if (result.exists) countCollectedByOthers++;
      }

      setCollectedByOthersStatus(countCollectedByOthers);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleAccessAllBookmark = () => {
    dispatch(setBookmarkTabStatus("MY"));
    navigate("Bookmark");
  };

  const handleAccessCollection = () => {
    dispatch(setBookmarkTabStatus("collected"));
    navigate("Bookmark");
  };

  const handleCollectButtonPress = async (bookmarkId) => {
    const isCollected = currentCollectStatesList[bookmarkId];

    try {
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
        setCurrentCollectStatesList({
          ...currentCollectStatesList,
          [bookmarkId]: !isCollected,
        });
      }
    } catch (error) {
      console.error("책갈피 즐겨찾기 정보 업데이트에 실패하였습니다: ", error);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} />
      <ScrollView ref={scrollViewRef}>
        <View style={styles.topRecommendedContainer}>
          {recommendedBookmark.length > 0 && (
            <CarouselComponent
              recommendedBookmark={recommendedBookmark}
              handleCollectButtonPress={handleCollectButtonPress}
              currentCollectStatesList={currentCollectStatesList}
            />
          )}
        </View>
        <View style={styles.bookmarkCollectionContainer}>
          <View style={styles.bookmarkCollectionTitleContainer}>
            <Text style={styles.titleBold}>책갈피</Text>
            <Text style={styles.titleRegular}> 모아보기</Text>
          </View>
          <View style={styles.bookmarkCollectionImageContainer}>
            <TouchableOpacity
              onPress={handleAccessAllBookmark}
              style={styles.bookmarkContainer}
            >
              <Image
                style={styles.bookmarkButton}
                source={require("../../assets/images/button-bookmark-all.png")}
              />
              <Text style={styles.buttonBookmarkAllText}>전체보기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccessCollection}
              style={styles.bookmarkContainer}
            >
              <Image
                style={styles.bookmarkButton}
                source={require("../../assets/images/button-bookmark-collected.png")}
              />
              <Text style={styles.buttonBookmarkCollectedText}>내 수집함</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("BookmarkDetail")}
              style={styles.bookmarkContainer}
            >
              <Image
                style={styles.bookmarkButton}
                source={require("../../assets/images/button-bookmark-lucky.png")}
              />
              <Text style={styles.buttonBookmarkLuckyText}>최근 책갈피</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={["#F6E8D7", "#FDF8E2", "#E8F0F4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.chartContainer}
        >
          <View style={styles.chartTitleContainer}>
            <Text style={styles.titleRegular}>최근 내 </Text>
            <Text style={styles.titleBold}>관심사</Text>
          </View>
          <HashtagFrequencyGraph data={myHashtags} />
        </LinearGradient>
        <View style={styles.userStatusContainer}>
          <View style={styles.userStatusTitleContainer}>
            <Text style={styles.titleRegular}>주요 </Text>
            <Text style={styles.titleBold}>현황</Text>
          </View>
          <View style={styles.userStatusBodyContainer}>
            <View style={styles.userStatusRowContainer}>
              <TouchableOpacity
                onPress={() => navigate("Following")}
                style={styles.statusContainer}
              >
                <Image
                  style={styles.statusImage}
                  source={require("../../assets/images/button-unfollow.png")}
                />
                <Text style={styles.statusTitle}>팔로잉</Text>
                <Text style={styles.statusCount}>{followingStatus}</Text>
              </TouchableOpacity>
              <View style={styles.statusContainer}>
                <Image
                  style={styles.statusImage}
                  source={require("../../assets/images/button-unfollow.png")}
                />
                <Text style={styles.statusTitle}>팔로워</Text>
                <Text style={styles.statusCount}>{followerStatus}</Text>
              </View>
            </View>
            <View style={styles.userStatusRowContainer}>
              <TouchableOpacity
                onPress={handleAccessCollection}
                style={styles.statusContainer}
              >
                <Image
                  style={styles.statusImage}
                  source={require("../../assets/images/button-uncollect.png")}
                />
                <Text style={styles.statusTitle}>수집한</Text>
                <Text style={styles.statusCount}>{collectedStatus}</Text>
              </TouchableOpacity>
              <View style={styles.statusContainer}>
                <Image
                  style={styles.statusImage}
                  source={require("../../assets/images/button-uncollect.png")}
                />
                <Text style={styles.statusTitle}>수집된</Text>
                <Text style={styles.statusCount}>
                  {collectedByOthersStatus}
                </Text>
              </View>
            </View>
            <View style={styles.userStatusRowContainer}>
              <TouchableOpacity
                onPress={handleAccessAllBookmark}
                style={styles.statusContainer}
              >
                <Image
                  style={styles.statusImage}
                  resizeMode="contain"
                  source={require("../../assets/images/icon-bookmark.png")}
                />
                <Text style={styles.statusTitle}>보유 책갈피 수</Text>
                <Text style={styles.statusCount}>{bookmarkStatus}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
