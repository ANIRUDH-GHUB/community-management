import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import { USER } from "../../model/interfaces";
import { scheduleVisit, updateVisit } from "../../services/MessageService";
import { fetchUserDetails, getAllResidents } from "../../services/UserService";
import styles from "./style";
import { getStoreData } from "../../services/StorageService";
import AntDesign from "@expo/vector-icons/AntDesign";

const SchedulePopup = ({ showForm, setShowForm, booking, onChange }: any) => {
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [residents, setResidents] = useState<any>([]);
  const [selectedRes, setSelectedRes] = useState<any>();

  const fetchResidents = async () => {
    const res = await getAllResidents();
    setResidents(res);
  };
  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    if (booking) {
      console.log(booking?.res);
      setSelectedRes(booking?.res?.uid);
      setDate(booking?.date);
      setDuration(booking?.duration);
    }
  }, [booking]);

  const onDateChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const submitHadler = async () => {
    const creds = await getStoreData("user_creds");
    const userData = await fetchUserDetails();
    const resData = await fetchUserDetails(selectedRes);
    setShowForm(false);
    const bookingData = {
      res: resData,
      visId: creds?.token,
      visName: userData?.name || "Anonymous",
      date: date,
      duration: duration,
    };
    if (booking) {
      await updateVisit(bookingData, booking);
    } else {
      scheduleVisit(bookingData);
    }
    onChange();
  };

  const residentDropDown = () =>
    residents?.map((resident: USER) => ({
      label: resident?.unit,
      value: resident?.uid,
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
            setValue={(val: any) => {
              console.log(val);
              setSelectedRes(val);
            }}
            placeHolder="Select Unit"
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
            <Text>{date?.toDateString()}</Text>
          </Pressable>
          <DropdownComponent
            data={numberDropDown()}
            value={duration}
            setValue={setDuration}
            placeHolder="Select Duration"
            user={false}
          />
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
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
