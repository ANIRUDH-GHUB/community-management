import { StyleSheet } from "react-native";
import { colors } from "../../../constants/variables";

export default StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.cardbg,
    borderRadius: 7,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});