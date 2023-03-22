import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { colors } from "../../../constants/variables";
import styles from "./styles";

interface ButtonProps {
  style?: Object;
  bgColor?: string;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const Button: React.FC<ButtonProps> = (props) => {
  const { style, onPress, children, bgColor, loading } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? `${bgColor}A6` : bgColor,
        },
        style,
        styles.btn,
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : typeof children === "string" ? (
        <Text style={[styles.buttonText]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  style: styles,
  bgColor: colors.gray,
  loading: false,
  onPress: () => console.log("clicked"),
  children: "Button",
};

export default Button;
