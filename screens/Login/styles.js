import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    right: 0,
    left: 0,
    alignItems: "center",
  },
  logo: {
    width: "50%",
    resizeMode: "contain",
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    bottom: 90,
    left: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: PRIMARY_YELLOW,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
});

export default styles;
