import React from "react";
import { View, Text } from "react-native";
import common from "./../../../constants/Styles";
import styles from './style'

interface HeaderPros {
  title: string;
}

const Header: React.FC<HeaderPros> = (props) => {
  const { title } = props;
  return (
    <View style={styles.m_20}>
      <Text style={common.header}>{title}</Text>
    </View>
  );
};

export default Header;
