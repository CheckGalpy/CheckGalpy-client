import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import transformTimeStamp from "../../utils/formatTimeStamp";
import HighlightedContent from "../HighlightedContent/HighlightedContent";

export default function NonEditableCard({
  bookmark,
  isSearching,
  searchKeyword,
  collectStatusList,
  cardExpasionStatusList,
  handleCollectButtonPress,
  handleExpansionButtonPress,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerConatainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.dateString}>
            {transformTimeStamp(new Date(bookmark.createdAt))}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.collectButtonContainer}
          onPress={() => handleCollectButtonPress(bookmark._id)}
        >
          {!isSearching && (
            <Image
              source={
                collectStatusList[bookmark._id]
                  ? require("../../assets/images/button-uncollect.png")
                  : require("../../assets/images/button-collect.png")
              }
              style={styles.collectButton}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
      {isSearching ? (
        <HighlightedContent text={bookmark.content} keyword={searchKeyword} />
      ) : (
        <Text
          style={styles.content}
          numberOfLines={cardExpasionStatusList[bookmark._id] ? undefined : 7}
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
  );
}

NonEditableCard.propTypes = {
  bookmark: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
  }),
  isSearching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string,
  collectStatusList: PropTypes.object.isRequired,
  cardExpasionStatusList: PropTypes.object.isRequired,
  handleCollectButtonPress: PropTypes.func.isRequired,
  handleExpansionButtonPress: PropTypes.func.isRequired,
};
