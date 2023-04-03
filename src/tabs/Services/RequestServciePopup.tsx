import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { colors,servicesList } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import { addService, getAllServices } from "../../services/ResidentServices";
import styles from "./styles";
import { getStoreData } from "../../services/StorageService";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputBox from "../../components/InputBox/InputBox";
import { updateDocData } from "../../services";
import { v4 as uuidv4 } from 'uuid';


const RequestServciePopup = ({ showForm, setShowForm }: any) => {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [showDate, setShowDate] = useState(false);
  const [selectedService, setSelectedService] = useState<any>();

  const fetchServices = async () => {
  };
  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    console.log(selectedService);
  }, [selectedService]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const submitHadler = async () => {
    const creds = await getStoreData("user_creds");
    setShowForm(false);
    const service = {
      // service_id:uuidv4(),
      service: selectedService,
      resId: creds?.token,
      date: date,
      description: description,
    };
    console.log("start++++++++++++++++++++++++++++++++++");
    await addService(service);
    console.log("end++++++++++++++++++++++++++++++++++");
  //  updateDocData("services",creds.token,service,creds.token)
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
          <DropdownComponent
            data={servicesList}
            value={selectedService}
            setValue={setSelectedService}
            placeHolder="Select Service"
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
          <InputBox
            customTextStyle={{ color: colors.background }}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
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

export default RequestServciePopup;
