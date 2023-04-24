import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import transformTimeStamp from "../../utils/formatTimeStamp";
import HighlightedContent from "../../components/HighlightedContent/HighlightedContent";

export default function EditableCard({
  bookmark,
  isSearching,
  searchKeyword,
  handleBookmarkCardPress,
  handleDeleteButtonPress,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleBookmarkCardPress(bookmark._id)}>
        <Text style={styles.dateString}>
          {transformTimeStamp(new Date(bookmark.createdAt))}
        </Text>
        {isSearching ? (
          <HighlightedContent text={bookmark.content} keyword={searchKeyword} />
        ) : (
          <Text style={styles.content} numberOfLines={5}>
            {bookmark.content}
          </Text>
        )}
        <View style={styles.cardBottomConntainer}>
          <View style={styles.hashtagContainer}>
            {bookmark.hashtags?.map((tag, index) => (
              <Text
                key={index}
                style={
                  tag !== searchKeyword
                    ? styles.hashtag
                    : styles.highlightedHashtag
                }
              >
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
  );
}

EditableCard.propTypes = {
  bookmark: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string),
  }),
  isSearching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string,
  handleBookmarkCardPress: PropTypes.func.isRequired,
  handleDeleteButtonPress: PropTypes.func.isRequired,
};
