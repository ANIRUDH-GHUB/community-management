import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useState, useEffect, useMemo } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  Platform,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import Header from "../../components/Header/Header";
import { USER } from "../../model/interfaces";
import { getAllResidents } from "../../services/UserService";
import EditIcon from "./../../../assets/icons/edit.png";
import inboxJSON from "./../../../assets/json/inbox.json";
import SchedulePopup from "./SchedulePopup";
import styles from "./style";
import { visitorBookings } from "../../services/MessageService";

const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");

  useEffect(() => {
    (async () => {
      let bookings = await visitorBookings();
      switch (selected) {
        case "upcoming":
          bookings = bookings?.filter(
            (item: any) => getDate(item?.date?.seconds) > new Date()
          );
          break;
        case "past":
          bookings = bookings?.filter(
            (item: any) => getDate(item?.date?.seconds) <= new Date()
          );
          break;
      }
      setBookings(bookings);
    })();
  }, [selected, showForm]);


  return (
    <Container style={common.container}>
      <Header title="Schedule"></Header>
      <Button onPress={() => setShowForm(true)}>Schedule Visit</Button>
      <View style={{ flexDirection: "row" }}>
        {["upcoming", "past"].map((item) => (
          <Pressable
            key={item}
            style={{ width: "50%", padding: 10 }}
            onPress={() => setSelected(item)}
          >
            <Text
              style={[
                common.text,
                common.sm,
                common.capital,
                common.center,
                {
                  color:
                    selected == item ? colors.fountainblue : colors.slategray,
                  fontFamily:
                    selected == item ? "PTMono-Bold" : "PTMono-Regular",
                },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView>
        <ScheduleList list={bookings} options={true} />
      </ScrollView>
      <SchedulePopup showForm={showForm} setShowForm={setShowForm} />
    </Container>
  );
};

const ScheduleList = ({ list, options }: any) => {
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={list}
        renderItem={(item) => {
          console.log();
          return (
            <Card>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={[common.text, common.md]}>
                    {item.item?.res?.name || ''}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                    {getDate(item.item.date.seconds).toDateString()}
                    {" → "}
                    {item.item.duration} 
                  </Text>
                </View>
                {options && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={EditIcon}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                  </View>
                )}
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default Schedule;
