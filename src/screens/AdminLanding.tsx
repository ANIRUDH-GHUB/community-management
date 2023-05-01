import React from "react";
import Container from "../components/Container/Container";
import common from "../../constants/Styles";
import { screenOptions, Tab } from "../utils/tabUtils";
import Profile from "../tabs/Profile/Profile";
import Inbox from "../tabs/Inbox/Inbox";
import { BlurView } from "expo-blur";
import AdminManageUsers from "../tabs/Admin/AdminManageUsers";
import Apartment from "../tabs/Admin/Apartment";
import Services from "../tabs/Services/Services";
import Report from "../tabs/Report/Report";

const AdminLanding = ({ navigation }: any) => {
  return (
    <Container style={common.container}>
      <BlurView
        intensity={90}
        tint="dark"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Users">
          <Tab.Screen name="Users" component={AdminManageUsers} />
          <Tab.Screen name="Inbox" component={Inbox} />
          <Tab.Screen name="Apartment" component={Apartment} />
          <Tab.Screen name="Services" component={Services} />
          <Tab.Screen name="Report" component={Report} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </BlurView>
    </Container>
  );
};

export default AdminLanding;
