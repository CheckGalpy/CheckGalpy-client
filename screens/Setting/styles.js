import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: PRIMARY_YELLOW,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
});

export default styles;
