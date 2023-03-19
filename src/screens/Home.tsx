import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const handlePress = (screenName: string) => {
    console.log(screenName)
    navigation.navigate(screenName);
  };


  return (
    <View style={styles.container}>
      <Button title="LOGIN" onPress={() => handlePress('Login')} />
      <Button title="REGISTER" onPress={() => handlePress('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;