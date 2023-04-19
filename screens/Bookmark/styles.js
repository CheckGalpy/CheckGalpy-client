import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#e1e1e1",
    borderBottomColor: "#e1e1e1",
  },
  lenseIcon: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
  },
  controllerContainer: {
    flexDirection: "row",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  selectionContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeTab: {
    backgroundColor: PRIMARY_YELLOW,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  filterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  filterInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontSize: 10,
    fontcolor: "#e1e1e1",
  },
  filterIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  cardContainer: { paddingTop: 5, paddingBottom: 105 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
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
  cardBottomConntainer: { flexDirection: "row" },
  hashtagContainer: {
    flex: 7,
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
  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteText: {
    color: "gray",
    fontSize: 10,
  },
});

export default styles;
