import React from "react";
import {
  ScrollView,
  StyleSheet,
  StyleSheetProperties,
  View,
} from "react-native";
import styles from "./styles";
import { colors } from "../../../constants/variables";

interface CardProps {
  style?: Object;
  children?: JSX.Element[] | JSX.Element;
}

const Card: React.FC<CardProps> = (props) => {
  const { style, children } = props;
  const agent = "Android";

  return (
    <View style={[styles.card, style]}>
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        {children}
      </ScrollView>
    </View>
  );
};

Card.defaultProps = {
  style: {
    backgroundColor: colors.elevatedBackground,
  },
};

export default Card;
