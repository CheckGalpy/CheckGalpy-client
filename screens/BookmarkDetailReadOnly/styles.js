import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  dateString: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    marginBottom: 20,
    fontSize: 14,
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hashtag: {
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    fontSize: 12,
  },
});

export default styles;
