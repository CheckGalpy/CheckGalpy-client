import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  cardContainer: { paddingTop: 5, paddingBottom: 105 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
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
