import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import styles from "./styles";

const Services = () => {
  return (
    <Container style={styles.m_20}>
      <Text style={[common.text, common.md, common.center, {paddingBottom: 10}]}>Services</Text>
      <Card>
        <Text style={[common.md]} >Car Wash</Text>
        <Text style={[common.sm]}>01/02/23</Text>
      </Card>
      <Card>
        <Text style={[common.md]}>Repair TV</Text>
        <Text style={[common.sm]}>01/03/23</Text>
      </Card>
    </Container>
  );
};

export default Services;
