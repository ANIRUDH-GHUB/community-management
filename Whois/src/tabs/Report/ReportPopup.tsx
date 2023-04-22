import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import { addActivity, editActivity } from "../../services/ResidentServices";
import styles from "./style";
import { getStoreData } from "../../services/StorageService";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputBox from "../../components/InputBox/InputBox";
import Divider from "../../components/Divider";

const ReportPopup = ({ showForm, setShowForm, onChange, activity }: any) => {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [showDate, setShowDate] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>('');

  const fetchServices = async () => {};
  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (activity) {
      console.log(activity);
      setSelectedActivity(activity?.activity);
      setDate(activity?.date);
      setDescription(activity?.description);
    }
  }, [activity]);

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const submitHadler = async () => {
    const creds = await getStoreData("user_creds");
    setShowForm(false);
    const activityData = {
      activity: selectedActivity,
      resId: creds?.token,
      date: date,
      description: description,
    };
    if (activity) {
      await editActivity(activityData, activity);
    } else {
      await addActivity(activityData);
    }
    onChange();
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
          <Divider height={20} />
          <InputBox
            customTextStyle={{ fontSize: 18 }}
            customStyle={{ borderWidth: 0 }}
            placeholder="Title..."
            value={selectedActivity}
            onChangeText={setSelectedActivity}
          />
          <Pressable
            onPress={() => setShowDate(true)}
            style={{
              flexDirection: "row",
              marginLeft: 16,
              marginRight: 16,
              alignItems: "center",
              // paddingBottom: 16,
              height: 60,
              borderBottomColor: "rgb(128, 128, 128)",
              borderBottomWidth: 1,
              borderTopWidth: 1,
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
              onChange={onDateChange}
            />
          )}
          <InputBox
            customTextStyle={{ color: colors.slategray }}
            customStyle={{ borderWidth: 0 }}
            placeholder="Description..."
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

export default ReportPopup;
