import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
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
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    backgroundColor: PRIMARY_YELLOW,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: PRIMARY_YELLOW,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default styles;
