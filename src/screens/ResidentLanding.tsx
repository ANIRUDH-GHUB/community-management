import React from "react";
import Container from "../components/Container/Container";
import common from "../../constants/Styles";
import ResidentHome from "../tabs/ResidentHome/ResidentHome";
import Settings from "../tabs/Settings/Settings";
import { screenOptions, Tab } from "../utils/tabUtils";
import Profile from "../tabs/Profile/Profile";

const ResidentLanding = () => {
  return (
    <Container style={common.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={ResidentHome}/>
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Container>
  );
};

export default ResidentLanding;
