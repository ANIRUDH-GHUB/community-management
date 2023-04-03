import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import { USER } from "../../model/interfaces";
import { scheduleVisit } from "../../services/MessageService";
import { fetchUserDetails, getAllResidents } from "../../services/UserService";
import styles from "./style";
import { getStoreData } from "../../services/StorageService";
import AntDesign from "@expo/vector-icons/AntDesign";
import { v4 as uuidv4 } from "uuid";
const SchedulePopup = ({ showForm, setShowForm }: any) => {
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [residents, setResidents] = useState<any>([]);
  const [selectedRes, setSelectedRes] = useState<any>();
  const { user } = useSelector((state: any) => state.user);

  const fetchResidents = async () => {
    const res = await getAllResidents();
    setResidents(res);
  };
  useEffect(() => {
    fetchResidents();
  }, [showForm]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const submitHadler = async () => {
    const creds = await getStoreData("user_creds");
    console.log("date", user);
    const userData = await fetchUserDetails();
    setShowForm(false);
    const booking = {
      res: selectedRes,
      visId: creds?.token,
      visName: userData?.name || "Anonymous",
      date: date,
      duration: duration,
    };
    scheduleVisit(booking);
  };

  const residentDropDown = () =>
    residents?.map((resident: USER) => ({
      label: resident?.name,
      value: resident,
    }));
  const numberDropDown = () =>
    [...Array(100).keys()].map((item) => ({
      label: item + "",
      value: item,
    }));

  return (
    <Modal
      animationType={"slide"}
      transparent={showForm}
      visible={showForm}
      onRequestClose={() => {
        Alert.alert("Modal has now been closed.");
      }}
    >
      <BlurView intensity={90} tint="dark" style={styles.boxCenter}>
        <View style={styles.popup}>
          <DropdownComponent
            data={residentDropDown()}
            value={selectedRes}
            setValue={setSelectedRes}
            placeHolder="Select Resident"
          />
          <Pressable
            onPress={() => setShowDate(true)}
            style={{
              flexDirection: "row",
              marginLeft: 16,
              alignItems: "center",
              paddingBottom: 16,
              height: 50,
              borderBottomColor: "rgb(128, 128, 128)",
              borderBottomWidth: 0.5,
            }}
          >
            <AntDesign
              style={{ marginRight: 15 }}
              color="black"
              name="calendar"
              size={20}
            />
            <Text>{date.toDateString()}</Text>
          </Pressable>
          <DropdownComponent
            data={numberDropDown()}
            value={duration}
            setValue={setDuration}
          />
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
          <Button onPress={() => submitHadler()} bgColor={colors.green}>
            Submit
          </Button>
          <Button onPress={() => setShowForm(false)} bgColor={colors.slategray}>
            Close
          </Button>
        </View>
      </BlurView>
    </Modal>
  );
};

export default SchedulePopup;
