import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API_URI as API_URI } from "@env";

import styles from "./styles";

import SearchBox from "../../components/SearchBox.js/SearchBox";
import SortController from "../../components/SortController/SortController";

export default function Following() {
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const scrollViewRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [followingStatusList, setFollowingStatusList] = useState({});
  const [filteredFollowingList, setFilteredFollowingList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("오름차순");

  useEffect(() => {
    getAllFollowings();
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

  const getAllFollowings = async () => {
    try {
      const url = `${API_URI}/api/follows/${currentUserId}/following`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const followingUsers = await response.json();
      const sortedFollowingUsers = followingUsers.sort((a, b) =>
        a.familyName.toLowerCase() > b.familyName.toLowerCase() ? 1 : -1,
      );
      setFollowingList(sortedFollowingUsers);

      const followingStatus = sortedFollowingUsers.reduce((acc, user) => {
        acc[user._id] = true;
        return acc;
      }, {});

      setFollowingStatusList(followingStatus);
    } catch (error) {
      console.error("팔로잉 정보를 가져오는데 실패하였습니다: ", error);
    }
  };

  const handleSearch = async () => {
    const filteredFollowingList = followingList.filter(
      (following) =>
        following.email.includes(searchKeyword) ||
        (following.familyName + following.givenName).includes(searchKeyword),
    );
    setFilteredFollowingList(filteredFollowingList);
    setIsSearching(true);
    scrollToTop();
  };

  const handleSortToggle = () => {
    setFollowingList(followingList.reverse());
    setFilteredFollowingList(filteredFollowingList.reverse());
    setSortOrder(sortOrder === "오름차순" ? "내림차순" : "오름차순");
    scrollToTop();
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

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
  };

  return (
    <View style={styles.container}>
      <SearchBox
        setSearchKeyword={setSearchKeyword}
        placeholder="팔로우하는 계정을 검색해보세요"
      />
      <View style={styles.controllerContainer}>
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={[styles.tab]}>
            <Text style={styles.tabText}>팔로잉</Text>
          </TouchableOpacity>
        </View>
        <SortController
          sortOrder={sortOrder}
          handleSortToggle={handleSortToggle}
        />
      </View>
      <View style={styles.cardContainer}>
        <ScrollView ref={scrollViewRef}>
          {(isSearching ? filteredFollowingList : followingList).map(
            (targetUser, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  style={styles.profileContainer}
                  // onPress={() => handleFollowCardPress(targetUser._id)}
                >
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: targetUser.avatarURL }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>
                      {targetUser.familyName + targetUser.givenName}
                    </Text>
                    <Text style={styles.email}>{targetUser.email}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.followingButtonContainer}>
                  <TouchableOpacity style={styles.followingingButtonContainer}>
                    <Image
                      onPress={() => handleFollowingButtonPress(targetUser._id)}
                      source={
                        followingStatusList[targetUser._id]
                          ? require("../../assets/images/button-unfollow.png")
                          : require("../../assets/images/button-follow.png")
                      }
                      style={styles.followingButton}
                      resizeMode="contain"
                    />
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
