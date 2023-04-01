import { Text, View,ScrollView,Modal,Alert, Pressable} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import styles from "./styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import DropdownComponent from "../../components/Dropdown/Dropdown";
// import { getAllServices } from "../../services/Services";
import res from './../../../assets/json/residentservices.json'
import { SERVICETYPE } from "../../model/interfaces";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";

type ItemProps = { title: string };

const servicesList = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
const Item = ({ title }: ItemProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const Services = () => {
  const [services, setServices] = useState<SERVICETYPE[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const response = res;
    if (response) {
      setServices(response);
    }
  }, []);

  return (
    <Container>
      <Header title="Services" />
      <Button onPress={() => setShowForm(true)} >Request Services</Button>
      <RequestServices showForm={showForm} setShowForm={setShowForm} />
      <FlatList
        data={services}
        renderItem={(item) => {
          console.log(item);
          return (
            <Card>
              <Text style={[common.md]}>{item.item.service_name}</Text>
              <Text style={[common.sm]}>{item.item.requested_date}</Text>
            </Card>
          );
        }}
      />
    </Container>
  );
};

const RequestServices = ({ showForm, setShowForm }: any) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

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
          <DropdownComponent data={servicesList}/>
          <Pressable onPress={()=>setShowDate(true)}><Text>{date.toDateString()}</Text></Pressable>
          {showDate && <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />}
          <Button>Request</Button>
          <Button onPress={() => setShowForm(false)}>Close</Button>
        </View>
      </BlurView>
    </Modal>
  );
};


export default Services;
