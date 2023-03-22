import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { colors } from "../../constants/variables";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import HomeImage from "./../../assets/icons/home.png";
import common from "./../../constants/Styles";

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const handlePress = (screenName: string) => {
    console.log(screenName);
    navigation.navigate(screenName);
  };

  return (
    <Container style={common.container}>
      <Image source={HomeImage} style={styles.image} resizeMode="contain" />
      <Button onPress={() => handlePress("Login")} bgColor={colors.green}>
        LOGIN
      </Button>
      <Button onPress={() => handlePress("SignUp")}>REGISTER</Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
    borderRadius: 20,
  },
});
export default Home;
