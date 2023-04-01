import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";
import { TABS } from "../model/interfaces";
import { Image } from "react-native";
import { colors } from "../../constants/variables";
import UsermaleIcon from "./../../assets/icons/user-male.png";
import UsermaleSelectedIcon from "./../../assets/icons/user-male-selected.png";
import PreferenceIcon from "./../../assets/icons/preference.png";
import PreferenceSelectedIcon from "./../../assets/icons/preference-selected.png";
import ReportIcon from "./../../assets/icons/report.png";
import ReportSelectedIcon from "./../../assets/icons/report-selected.png";
import InboxIcon from "./../../assets/icons/inbox.png";
import InboxSelectedIcon from "./../../assets/icons/inbox-selected.png";
import ScheduleIcon from "./../../assets/icons/schedule.png";
import ScheduleSelectedIcon from "./../../assets/icons/schedule-selected.png";
export const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  unselected: {
    Home: PreferenceIcon,
    Settings: PreferenceIcon,
    Profile: UsermaleIcon,
    Inbox: InboxIcon,
    Services: PreferenceIcon,
    Report: ReportIcon,
    Schedule: ScheduleIcon,
  },
  selected: {
    Home: PreferenceIcon,
    Settings: PreferenceIcon,
    Profile: UsermaleSelectedIcon,
    Inbox: InboxSelectedIcon,
    Services: PreferenceSelectedIcon,
    Report: ReportSelectedIcon,
    Schedule: ScheduleSelectedIcon,
  },
};

export const screenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => BottomTabNavigationOptions) = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = TAB_ICONS.unselected?.[route.name as TABS];
    if(focused) iconName = TAB_ICONS.selected?.[route.name as TABS];
    return (
      <Image
        source={iconName}
        resizeMode="contain"
        style={{
          height: 30,
          width: 30,
        }}
      />
    );
  },
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: `${colors.elevatedBackground}A6`,
    height: 60,
  },
});
