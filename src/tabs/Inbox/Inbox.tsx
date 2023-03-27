import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Inbox = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Inbox</Text>
    </Container>
  );
};

export default Inbox;
