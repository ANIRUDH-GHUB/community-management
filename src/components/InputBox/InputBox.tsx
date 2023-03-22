import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../constants/variables";

interface InputProps {
  placeholder: string;
  onChangeText?: any;
  value: string;
  type?: any;
}

const InputBox: React.FC<InputProps> = (props) => {
  const { placeholder, onChangeText, value, type } = props;
  const [secure, setSecurity] = useState<boolean>(() => type === "password");

  return (
    <View style={styles.container}>
      <View style={styles.inp_container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.slategray}
          secureTextEntry={secure}
          autoCorrect={false}
          autoComplete={"name"}
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        {type === "password" && (
          <FontAwesome
            onPress={() => setSecurity(!secure)}
            style={{ zIndex: 10, paddingRight: 20 }}
          >
            <FontAwesomeIcon
              icon={secure ? faEyeSlash : faEye}
              size={22}
              color={colors.white}
            />
          </FontAwesome>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  inp_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "5%",
    marginRight: "5%",
    borderWidth: 1,
    borderColor: colors.bordergray,
    borderRadius: 16,
  },
  input: {
    flex: 1,
    fontFamily: "PTMono-Regular",
    fontSize: 14,
    padding: 20,
    paddingLeft: 16,
    marginRight: -10,
    color: colors.white,
  },
});
InputBox.defaultProps = {
  type: "text",
};

export default InputBox;
