import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

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
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secure}
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      {type === "password" && (
        <FontAwesome onPress={() => setSecurity(!secure)}>
          <FontAwesomeIcon
            icon={secure ? faEyeSlash : faEye}
            style={{ zIndex: 10 }}
            size={30}
          />
        </FontAwesome>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    width: "100%",
  },
  input: {
    width: "80%",
    fontFamily: "PTMono-Regular",
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10,
  },
});
InputBox.defaultProps = {
  type: "text",
};

export default InputBox;
