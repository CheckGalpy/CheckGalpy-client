import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "white",
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  containerLeft: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  backButton: {
    width: 25,
    height: 25,
    marginBottom: 15,
    marginLeft: 10,
  },
  containerCenter: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 10,
  },
  containerRight: {
    flex: 1,
  },
});

export default styles;
