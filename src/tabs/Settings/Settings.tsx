import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Settings = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Settings</Text>
    </Container>
  );
};

export default Settings;
