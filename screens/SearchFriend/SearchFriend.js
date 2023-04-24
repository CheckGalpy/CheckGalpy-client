import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { REACT_APP_API_URI as API_URI } from "@env";
import { useNavigation } from "@react-navigation/native";

import { setAccessedUser } from "../../redux/accessedUserSlice";
import styles from "./styles";

import SearchBox from "../../components/SearchBox.js/SearchBox";

export default function SearchFriend() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const [targetUserList, setTargetUserList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [followingStatusList, setFollowingStatusList] = useState({});

  useEffect(() => {
    if (!searchKeyword) {
      setTargetUserList([]);
    } else {
      getTargetUserList();
    }
  }, [searchKeyword]);

  const getTargetUserList = async () => {
    try {
      const url = `${API_URI}/api/users/search?keyword=${searchKeyword}&currentUserId=${currentUserId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const filteredTargetUsers = data?.targetUsers?.filter(
        (user) => user._id !== currentUserId,
      );
      setTargetUserList(filteredTargetUsers);
      setFollowingStatusList(data?.targetUsersFollowingStatus);
    } catch (error) {
      console.error("서버에서 유저정보를 불러오는데 실패하였습니다: ", error);
    }
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

  const handleUserCardPress = (
    targetUserId,
    targetUserFamilyName,
    targetUseGivenName,
  ) => {
    const accessedUser = {
      id: targetUserId,
      name: targetUserFamilyName + targetUseGivenName,
    };
    dispatch(setAccessedUser(accessedUser));
    navigate("ExternalBookmark");
  };

  return (
    <View style={styles.container}>
      <SearchBox
        setSearchKeyword={setSearchKeyword}
        placeholder="팔로우할 계정을 검색하세요"
      />
      <View style={styles.cardContainer}>
        <ScrollView>
          {targetUserList.map((targetUser, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={() =>
                  handleUserCardPress(
                    targetUser._id,
                    targetUser.familyName,
                    targetUser.givenName,
                  )
                }
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
                <TouchableOpacity
                  style={styles.followingingButtonContainer}
                  onPress={() => handleFollowingButtonPress(targetUser._id)}
                >
                  <Image
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
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
