import React from "react";
import { Pressable, View, Text } from "react-native";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

interface ButtonProps {
  style?: Object;
  onPress?: (event: GestureResponderEvent) => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const Button: React.FC<ButtonProps> = (props) => {
  const { style, onPress, children } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
};

Button.defaultProps = {
  style: {},
  onPress: () => console.log("clicked"),
  children: "Button",
};
export default Button;
