import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const Report = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Report</Text>
    </Container>
  );
};

export default Report;
