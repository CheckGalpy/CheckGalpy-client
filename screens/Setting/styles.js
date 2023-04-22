import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
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
  buttonContainer: {
    backgroundColor: PRIMARY_YELLOW,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "90%",
    alignItems: "center",
    marginTop: 25,
  },
});

export default styles;
