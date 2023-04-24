import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  headerConatainer: { flexDirection: "row" },
  titleContainer: { flex: 9 },
  dateString: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "600",
  },
  collectButtonContainer: { flex: 1 },
  collectButton: {
    width: 30,
    height: 30,
  },
  content: {
    marginBottom: 20,
    fontSize: 14,
  },
  cardBottomConntainer: { flexDirection: "row" },
  hashtagContainer: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hashtag: {
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "ghostwhite",
    fontSize: 12,
  },
  highlightedHashtag: {
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: PRIMARY_YELLOW,
    fontSize: 12,
  },
  expandButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  expandButton: {
    width: 30,
    height: 30,
  },
});

export default styles;
