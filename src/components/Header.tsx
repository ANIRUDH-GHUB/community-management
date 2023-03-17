import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface HeaderProps {
  title: string;
  goBack?: any;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, goBack } = props;
  return (
    <View style={styles.header}>
        <FontAwesome onPress={goBack} style={styles.topLeft}>
            <FontAwesomeIcon icon={faArrowLeft} style={{zIndex: 10}} size={30}/>
        </FontAwesome>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    width: "100%",
    fontFamily: "PTMono-Regular",
    fontSize: 35,
    textAlign: "center",
  },
  topLeft: {
    position: 'absolute',
    left: 10,
    top: 5,
    zIndex: 10,
  },
});

export default Header;
