import common from "../../../constants/Styles";
import { StyleSheet } from "react-native";
import { colors } from "../../../constants/variables";

export default StyleSheet.create({
  ...common,
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    ...common.text
  },
});
