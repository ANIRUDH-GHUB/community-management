import { StyleSheet } from "react-native";
import { colors } from "../../../constants/variables";

export default StyleSheet.create({
  boxCenter: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
  },
  popup:{
    backgroundColor: colors.white,
    width: "80%",
  }
});
