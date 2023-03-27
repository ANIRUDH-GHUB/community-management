import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Tab = createBottomTabNavigator();

const VisitorHome = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Visitor Home</Text>
    </Container>
  );
};

export default VisitorHome;
