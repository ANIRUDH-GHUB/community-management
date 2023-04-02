import { useEffect, useState } from "react";
import {
  Image, Pressable, ScrollView, Text,
  View
} from "react-native";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import { getAllServices } from "../../services/ResidentServices";
import EditIcon from "./../../../assets/icons/edit.png";
// import { getAllServices } from "../../services/Services";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import RequestServciePopup from "./RequestServciePopup";


const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};
const Services = () => {
  const [services, setServices] = useState<any>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");

  useEffect(() => {
    (async () => {
      let services = await getAllServices();
      console.log("services1", services);
      switch (selected) {
        case "upcoming":
          services = services?.filter(
            (item: any) => getDate(item?.date?.seconds) > new Date()
          );
          break;
        case "past":
          services = services?.filter(
            (item: any) => getDate(item?.date?.seconds) <= new Date()
          );
          break;
      }
      setServices(services);
    })();
    console.log("services", services);
  }, [selected, showForm]);

  return (
    <Container style={common.container}>
      <Header title="Services" />
      <Button onPress={() => setShowForm(true)}>Request Services</Button>
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
        <ServiceList list={services} options={true} />
      </ScrollView>
      <RequestServciePopup showForm={showForm} setShowForm={setShowForm} />
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
                    {item.item?.service || ""}
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


export default Services;
