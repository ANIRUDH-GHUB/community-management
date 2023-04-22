import { StyleSheet } from "react-native";
import { colors } from "../../../constants/variables";

export default StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.white,
    backgroundColor: colors.elevatedBackground,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});