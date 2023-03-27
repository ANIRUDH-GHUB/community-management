import React from "react";
import Container from "../components/Container/Container";
import common from "../../constants/Styles";
import { screenOptions, Tab } from "../utils/tabUtils";
import Profile from "../tabs/Profile/Profile";
import Services from "../tabs/Services/Services";
import Inbox from "../tabs/Inbox/Inbox";
import Report from "../tabs/Report/Report";

const ResidentLanding = () => {
  return (
    <Container style={common.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Services" component={Services}/>
        <Tab.Screen name="Inbox" component={Inbox}/>
        <Tab.Screen name="Report" component={Report}/>
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Container>
  );
};

export default ResidentLanding;
