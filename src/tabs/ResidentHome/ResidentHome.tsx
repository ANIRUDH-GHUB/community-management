import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";

const ResidentHome = () => {
  return (
    <Container style={common.container}>
      <Text style={[common.text, common.md, common.center]}>Resident Home</Text>
    </Container>
  );
};

export default ResidentHome;
