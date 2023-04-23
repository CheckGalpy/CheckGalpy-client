import { StyleSheet } from "react-native";

import { PRIMARY_BLUE } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
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
    backgroundColor: PRIMARY_BLUE,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  cardContainer: { paddingTop: 5, paddingBottom: 105 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
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
  profileContainer: {
    flex: 6,
    flexDirection: "row",
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  userInfoContainer: {
    flex: 4,
  },
  userInfo: {
    flex: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginBottom: 4,
    fontSize: 20,
    fontWeight: "500",
  },
  email: {
    marginBottom: 4,
    fontSize: 12,
    color: "gray",
  },
  followingButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    width: 42,
    height: 42,
  },
});

export default styles;
