import { StyleSheet } from "react-native";
import { capitalise } from "../src/utils/commonUtil";
import { colors } from "./variables";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontFamily: "PTMono-Regular",
  },
  center: {
    textAlign: "center",
  },
  md: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  sm: {
    fontSize: 14,
  },
  light: {
    color: colors.slategray,
  },
  textBold: {
    fontFamily: "PTMono-Regular",
  },
  capital: {
    textTransform: "capitalize",
  },
  btn: {
    padding: 20,
    borderRadius: 40,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    backgroundColor: colors.background,
    paddingBottom: 10,
    textAlign: "center",
    color: colors.white,
    fontFamily: "PTMono-Regular",
    fontSize: 20,
    borderBottomColor: colors.bordergray,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  bottombar: {
    borderTopColor: colors.bordergray,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
