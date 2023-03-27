import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Profile = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Profile</Text>
    </Container>
  );
};

export default Profile;
