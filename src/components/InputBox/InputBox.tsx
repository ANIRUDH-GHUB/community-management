import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../constants/variables";
import common from "./../../../constants/Styles";
import Divider from "../Divider";
interface InputProps {
  placeholder?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value: string;
  type?: any;
  customStyle?: any;
  customTextStyle?: any;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  onRelease?: any;
  onPress?: any;
}

const InputBox: React.FC<InputProps> = (props) => {
  const {
    placeholder,
    onChangeText,
    value,
    type,
    customStyle,
    editable,
    customTextStyle,
    keyboardType,
    error,
    onRelease,
    onPress
  } = props;
  const [secure, setSecurity] = useState<boolean>(() => type === "password");

  return (
    <View style={styles.container}>
      <View style={[customStyle, styles.inp_container]}>
        <TextInput
          editable={editable}
          style={[styles.input, customTextStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.slategray}
          secureTextEntry={secure}
          autoCorrect={false}
          autoComplete={"name"}
          autoCapitalize="none"
          textContentType="creditCardNumber"
          keyboardType={keyboardType}
          onBlur={onRelease}
          onPressIn={onPress}
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
      {error && (
        <View style={{ minWidth: '85%'}}>
          <Divider height={20} />
          <Text
            style={[common.text, common.sm, common.center, { color: "red" }]}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
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
    borderColor: colors.bordergray,
    borderRadius: 16,
    minWidth: "85%",
  },
  input: {
    flex: 1,
    fontFamily: "PTMono-Regular",
    fontSize: 14,
    padding: 20,
    paddingLeft: 16,
    marginRight: -10,
  },
});
InputBox.defaultProps = {
  type: "text",
  customStyle: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
  },
  customTextStyle: {
    color: colors.white,
  },
  editable: true,
  keyboardType: "default",
  error: "",
  onRelease: ()=>{},
  onPress: ()=>{}
};

export default InputBox;
