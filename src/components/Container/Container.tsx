import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native/Libraries/StyleSheet/StyleSheet";
import styles from "./styles";

interface ContainerProps {
  style?: Object;
  children?: JSX.Element[] | JSX.Element;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { style, children } = props;
  return (
    <SafeAreaView style={[style, styles.container]}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Container;
