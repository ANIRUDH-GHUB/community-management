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
import styles from "./styles";
import { getStoreData } from "../../services/StorageService";
import AntDesign from "@expo/vector-icons/AntDesign";
import { v4 as uuidv4 } from "uuid";
import InputBox from "../../components/InputBox/InputBox";
import { addApartment } from "../../services/AdminServices";
const ApartmentPopup = ({ showForm, setShowForm }: any) => {
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [residents, setResidents] = useState<any>([]);
  const [selectedRes, setSelectedRes] = useState<any>();
  const { user } = useSelector((state: any) => state.user);
  const [unitName,setUnitName] = useState<string>("");
  const [floor,setFloor] = useState<string>("");

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
    const apartment = {
      unitName: unitName,
      floor: floor,
      date: date,
    };
    addApartment(apartment);
  };

  

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
        <InputBox
            customTextStyle={{ color: colors.background }}
            placeholder="Enter Unit Name"
            value={unitName}
            onChangeText={setUnitName}
          />
           <InputBox
            customTextStyle={{ color: colors.background }}
            placeholder="Enter Floor"
            value={floor}
            onChangeText={setFloor}
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

export default ApartmentPopup;
