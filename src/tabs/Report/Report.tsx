import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

import { useEffect, useState } from "react";
import { activitiesLabel, colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import {
  getAllActivities,
} from "../../services/ResidentServices";
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
      console.log("all activities", activities);
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
    console.log("services", activities);
  }, [selected, showForm]);

  return (
    <Container style={common.container}>
      <Header title="Report" />
      <Button onPress={() => setShowForm(true)}>Report Activities</Button>
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
        <ServiceList list={activities} options={true} />
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
                  <Text style={[common.text, common.md, common.textLabel]}>
                    {activitiesLabel?.[item.item?.activity] || ""}
                  </Text>
                  <Text style={[common.text, common.sm, common.textLabel, {color:colors.policeBlue}]}>
                    {item?.item?.description|| ""}
                  </Text>
                  <Text style={[common.text, common.sm, common.textLabel, {color:colors.slategray}]}>
                    {getDate(item.item.date.seconds).toDateString()}
                  </Text>
                </View>
                {options && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  ></View>
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
