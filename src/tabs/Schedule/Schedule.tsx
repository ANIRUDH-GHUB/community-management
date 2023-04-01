import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useState, useEffect } from "react";
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

const Schedule = () => {
  const [inbox, setSchedule] = useState(inboxJSON);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");

  // const filteredList = () => {
  //   let res;
  //   switch (selected) {
  //     case "upcoming":
  //       res = inbox?.filter((item) => item.approved == false);
  //       break;
  //     case "past":
  //       res = inbox?.filter((item) => item.approved == true);
  //       break;
  //   }
  //   console.log(res);
  //   return res;
  // };

  return (
    <Container style={common.container}>
      <Header title="Schedule"></Header>
      <Button onPress={() => setShowForm(true)}>Schedule Visit</Button>
      <View style={{ flexDirection: "row" }}>
        {["upcoming", "past"].map((item) => (
          <Pressable
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
        {/* <ScheduleList list={filteredList()} options={true} /> */}
      </ScrollView>
      <ScheduleVisit showForm={showForm} setShowForm={setShowForm} />
    </Container>
  );
};

const ScheduleList = ({ list, options }: any) => {
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={list}
        renderItem={(item) => {
          console.log(item);
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
                    {item.item.visitor_name}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                    {item.item.requested_date}
                    {" → "}
                    {item.item.no_of_days} days
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

const ScheduleVisit = ({ showForm, setShowForm }: any) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [residents, setResidents] = useState<any>([]);
  const [selectedRes, setSelectedRes] = useState<any>();

  const fetchResidents = async () => {
    const res = await getAllResidents();
    setResidents(res);
  };
  useEffect(() => {
    console.log("useEffect");
    fetchResidents();
  }, []);

  useEffect(()=>{
    console.log(selectedRes)
  }, [selectedRes])

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const dropDownData = () =>
    residents?.map((resident: USER) => ({
      label: resident?.name,
      value: resident,
    }));

  return (
    <Modal
      animationType={"slide"}
      transparent={showForm}
      visible={showForm}
      presentationStyle="formSheet"
      onRequestClose={() => {
        Alert.alert("Modal has now been closed.");
      }}
    >
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.gray,
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: "80%",
          }}
        >
          <DropdownComponent
            data={dropDownData()}
            value={selectedRes}
            setValue={setSelectedRes}
          />
          <Pressable onPress={() => setShowDate(true)}>
            <Text>{date.toDateString()}</Text>
          </Pressable>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Button onPress={() => setShowForm(false)}>Close</Button>
        </View>
      </BlurView>
    </Modal>
  );
};

export default Schedule;
