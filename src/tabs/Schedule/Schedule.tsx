import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Schedule = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Schedule Home</Text>
    </Container>
  );
};

export default Schedule;
