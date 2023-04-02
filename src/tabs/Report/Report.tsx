import { Text, View,ScrollView,Modal,Alert, Pressable, Image} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";

import EditIcon from "./../../../assets/icons/edit.png";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { addService ,getAllActivities,getAllServices} from "../../services/ResidentServices";
import DropdownComponent from "../../components/Dropdown/Dropdown";
// import { getAllServices } from "../../services/Services";
import res from './../../../assets/json/residentservices.json'
import { SERVICETYPE } from "../../model/interfaces";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import ReportPopup from "./ReportPopup";

type ItemProps = { title: string };


const Item = ({ title }: ItemProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);
const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};
const Report = () => {
  const [activities, setActivities] = useState<[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");

  useEffect(() => {
    (async () => {
      let activities = await getAllActivities();
      console.log("all activities",activities)
      switch (selected) {
        case "upcoming":
          activities = activities?.filter(
            (item: any) => getDate(item?.date?.seconds) > new Date()
          );
          break;
        case "past":
          activities = activities?.filter(
            (item: any) => getDate(item?.date?.seconds) <= new Date()
          );
          break;
      }
      setActivities(activities);
    })();
    console.log("services",activities)
  }, [selected, showForm]);

  return (
    <Container  style={common.container}>
      <Header title="Report" />
      <Button onPress={() => setShowForm(true)} >Report Activities</Button>
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
        <ServiceList list={activities}  options={true} />
      </ScrollView>
      <ReportPopup showForm={showForm} setShowForm={setShowForm} />
    </Container>
  );
};

const ServiceList = ({ list, options }: any) => {
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
                    {item.item?.activity || ''}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                  {getDate(item.item.date.seconds).toDateString()}
                    {" → "}
                    {item.item.description} days
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





export default Report;
