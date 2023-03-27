import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";

interface CardProps {
  style?: Object;
  children?: JSX.Element[] | JSX.Element;
}

const Card: React.FC<CardProps> = (props) => {
  const { style, children } = props;
  const agent = "Android";

  return (
    <View style = {styles.card}>
      <ScrollView contentContainerStyle={[style, { width: "100%" }]}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Card;
