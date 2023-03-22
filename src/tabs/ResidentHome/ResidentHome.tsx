import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Resident from "../../screens/Resident";
import Visitor from "../../screens/Visitor";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Resident" component={Resident} />
      <Tab.Screen name="Visitor" component={Visitor} />
    </Tab.Navigator>
  );
}