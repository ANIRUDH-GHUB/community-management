import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

interface ContainerProps {
  style?: Object;
  children?: JSX.Element[] | JSX.Element;
}

const isMobile = () => {
  return true;
};

const Container: React.FC<ContainerProps> = (props) => {
  const { style, children } = props;
  const agent = "Android";

  return isMobile() ? (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={[style, { width: "100%" }]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={[style, { width: "100%" }]}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Container;
