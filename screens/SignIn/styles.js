import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    width: "50%",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 90,
    alignItems: "center",
  },
  button: {
    backgroundColor: PRIMARY_YELLOW,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
});

export default styles;
