import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import ViewPager from "@react-native-community/viewpager";
import { REACT_APP_API_URI as API_URI } from "@env";
import PropTypes from "prop-types";

import { setCurrentBookmarkId } from "../../redux/currentBookmarkIdSlice";
import { setAccessedUser } from "../../redux/accessedUserSlice";
import styles from "./styles";

import ProgressBar from "../ProgressBar/ProgressBar";

const textColors = ["white", "white", "#181818", "#181818", "white"];
const gradientColors = [
  ["#2C4A72", "#3E669D", "#4270A9"],
  ["#3B5637", "#689860"],
  ["#DCF4ED", "#EFF1F0", "#F2F4F6"],
  ["#FAF5D1", "#F9F9CA", "#FBF9EE"],
  ["#404040", "#333333", "#181818"],
];

export default function CarouselComponent({
  recommendedBookmark,
  handleCollectButtonPress,
  currentCollectStatesList,
}) {
  const { navigate } = useNavigation();
  const viewPagerRef = useRef();

  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const [bookmarkCreator, setBookmarkCreator] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [followingStatusList, setFollowingStatusList] = useState({});

  useEffect(() => {
    if (recommendedBookmark) {
      getBookmarkCreatorAndFollowingStatus();
    }
  }, [recommendedBookmark]);

  useEffect(() => {
    const interval = setInterval(() => {
      viewPagerRef.current.setPage(
        (activeIndex + 1) % recommendedBookmark.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, recommendedBookmark.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      viewPagerRef.current.setPage(
        (activeIndex + 1) % recommendedBookmark.length,
      );
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1 / (5000 / 100)) % 1);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [activeIndex, recommendedBookmark.length]);

  const getBookmarkCreatorAndFollowingStatus = async () => {
    const users = {};
    const followingStatus = {};

    try {
      for (const bookmark of recommendedBookmark) {
        const response = await fetch(
          `${API_URI}/api/users/${bookmark.creatorId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const user = await response.json();
        users[bookmark.creatorId] = user;

        followingStatus[bookmark.creatorId] = false;
      }

      setBookmarkCreator(users);
      setFollowingStatusList(followingStatus);
    } catch (error) {
      console.error("유저정보를 가져오지 못했습니다: ", error);
    }
  };

  const onPageSelected = (event) => {
    setActiveIndex(event.nativeEvent.position);
    setProgress(0);
  };

  const renderDots = () => {
    return recommendedBookmark.map((_, index) => {
      const dotStyle = index === activeIndex ? styles.activeDot : styles.dot;
      return <TouchableOpacity key={index} style={dotStyle} />;
    });
  };

  const getTextColor = () => {
    return textColors[activeIndex % textColors.length];
  };

  const handleCarousalPress = (bookmark) => {
    const accessedUser = {
      id: bookmark.creatorId,
      name:
        bookmarkCreator[bookmark.creatorId]?.familyName +
        bookmarkCreator[bookmark.creatorId]?.givenName,
    };

    dispatch(setCurrentBookmarkId(bookmark._id));
    dispatch(setAccessedUser(accessedUser));
    navigate("BookmarkDetailReadOnly");
  };

  const handleFollowingButtonPress = async (targetUserId) => {
    const isFollowing = followingStatusList[targetUserId];

    try {
      const url = `${API_URI}/api/follows/${
        isFollowing ? "unfollow" : "follow"
      }`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: currentUserId,
          followeeId: targetUserId,
        }),
      });

      if (response.status === 201 || response.status === 200) {
        setFollowingStatusList({
          ...followingStatusList,
          [targetUserId]: !isFollowing,
        });
      }
    } catch (error) {
      console.error("팔로잉 정보 업데이트에 실패하였습니다: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ViewPager
        ref={viewPagerRef}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}
        pageMargin={20}
        animated
      >
        {recommendedBookmark.map((bookmark, index) => (
          <LinearGradient
            key={index}
            colors={gradientColors[index % gradientColors.length]}
            style={styles.bookmark}
          >
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => handleCarousalPress(bookmark)}
            >
              <View style={styles.labelContainer}>
                <Text style={styles.label}>HOT</Text>
              </View>
              <View style={styles.sectionTitle}>
                <Text
                  style={[
                    styles.sectionTitleTextBold,
                    { color: getTextColor() },
                  ]}
                >
                  취향저격
                </Text>

                <Text
                  style={[
                    styles.sectionTitleTextNormal,
                    { color: getTextColor() },
                  ]}
                >
                  {" 책갈피"}
                </Text>
              </View>
              <View style={styles.hashtagsContainer}>
                {bookmark.hashtags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    #{tag}
                  </Text>
                ))}
              </View>
              <Text
                style={[styles.content, { color: getTextColor() }]}
                numberOfLines={10}
              >
                {bookmark.content}
              </Text>
              <View style={styles.carousalBottomContainer}>
                <View style={styles.carousalBottomLeftContainer}>
                  <TouchableOpacity
                    style={styles.followingingButtonContainer}
                    onPress={() =>
                      handleFollowingButtonPress(bookmark.creatorId)
                    }
                  >
                    <Image
                      source={
                        followingStatusList[bookmark.creatorId]
                          ? require("../../assets/images/button-unfollow.png")
                          : require("../../assets/images/button-follow.png")
                      }
                      style={styles.followingButton}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.creatorNameTextContainer}>
                    <Text
                      style={[
                        styles.creatorNameText,
                        { color: getTextColor() },
                      ]}
                    >
                      {bookmarkCreator[bookmark.creatorId]?.familyName +
                        bookmarkCreator[bookmark.creatorId]?.givenName}
                    </Text>
                    <Text
                      style={[styles.decorativeText, { color: getTextColor() }]}
                    >
                      님의 책갈피
                    </Text>
                  </View>
                </View>
                <View style={styles.carousalBottomRightContainer}>
                  <TouchableOpacity
                    onPress={() => handleCollectButtonPress(bookmark._id)}
                  >
                    <Image
                      source={
                        currentCollectStatesList[bookmark._id]
                          ? require("../../assets/images/button-uncollect.png")
                          : require("../../assets/images/button-collect.png")
                      }
                      style={styles.buttonCollect}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <ProgressBar progress={progress} duration={100} />
          </LinearGradient>
        ))}
      </ViewPager>
      <View style={styles.pagination}>{renderDots()}</View>
    </View>
  );
}

CarouselComponent.propTypes = {
  recommendedBookmark: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCollectButtonPress: PropTypes.func.isRequired,
  currentCollectStatesList: PropTypes.objectOf(PropTypes.bool).isRequired,
};
