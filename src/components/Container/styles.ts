import { StyleSheet } from "react-native";
import { colors } from "../../../constants/variables";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.background
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
