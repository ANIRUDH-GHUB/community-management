import React from "react";
import { Image } from "react-native";
import Button from "../Button/Button";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

interface IconProps {
  style?: Object;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  icon: any;
}

const Icon: React.FC<IconProps> = (props) => {
  const { style, icon, onPress, loading } = props;
  return (
    <Button
      style={{ backgroundColor: "unset", width: "unset", padding: 0 }}
      onPress={onPress}
      loading={loading}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          {
            height: 45,
            width: 45,
          },
          style,
        ]}
      />
    </Button>
  );
};

Icon.defaultProps = {
  style: {},
  onPress: () => console.log("clicked"),
  loading: false,
};

export default Icon;
