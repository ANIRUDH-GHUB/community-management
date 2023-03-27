import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";
import { faHome, faGear, faUserCircle, faScrewdriverWrench, faTriangleExclamation, faInbox} from "@fortawesome/free-solid-svg-icons";
import { TABS } from "../model/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: faHome,
  Settings: faGear,
  Profile: faUserCircle,
  Inbox: faInbox,
  Services: faScrewdriverWrench,
  Report: faTriangleExclamation
};

export const screenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => BottomTabNavigationOptions) = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const iconName = TAB_ICONS?.[route.name as TABS] || faHome;
    return <FontAwesomeIcon icon={iconName} color={color} size={20}></FontAwesomeIcon>;
  },
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
  tabBarShowLabel: false,
});
