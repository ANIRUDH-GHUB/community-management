import React from "react";
import Container from "../components/Container/Container";
import common from "../../constants/Styles";
import Settings from "../tabs/Services/Services";
import { screenOptions, Tab } from "../utils/tabUtils";
import Profile from "../tabs/Profile/Profile";
import Schedule from "../tabs/Schedule/Schedule";

const VisitorLanding = () => {
  return (
    <Container style={common.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Container>
  );
};

export default VisitorLanding;
