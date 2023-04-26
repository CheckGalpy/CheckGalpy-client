import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  headerContainer: {
    height: "5%",
    backgroundColor: "white",
  },
  bookmarkCollectionContainer: {
    paddingTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  bookmarkCollectionTitleContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 15,
  },
  bookmarkCollectionImageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bookmarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
  },
  bookmarkButton: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  chartContainer: {
    paddingTop: 15,
    paddingHorizontal: 30,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  chartTitleContainer: {
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: "row",
  },
  titleBold: {
    fontSize: 20,
    fontWeight: "600",
    color: "Black",
  },
  titleRegular: {
    fontSize: 20,
    fontWeight: "300",
    color: "Black",
  },
  userStatusContainer: {
    paddingTop: 15,
    paddingHorizontal: 30,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  userStatusTitleContainer: {
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: "row",
  },
  userStatusRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 10,
  },
  statusImage: {
    width: 35,
    height: 40,
  },
  statusTitle: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default styles;
