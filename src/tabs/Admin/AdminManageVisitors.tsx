import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, Pressable } from "react-native";

import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import { getAllVisitorBookings } from "../../services/AdminServices";
import CancelIcon from "./../../../assets/icons/cancel.png";
import DoneIcon from "./../../../assets/icons/done.png";
// import { getAllServices } from "../../services/Services";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import { colors } from "../../../constants/variables";

const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};
const AdminManageVisitors = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [selected, setSelected] = useState<string>("pending");

  useEffect(() => {
    (async () => {
      let bookings = await getAllVisitorBookings();
      console.log("All bookings", bookings);
      setBookings(bookings);
    })();
  }, []);

  return (
    <Container style={common.container}>
      <Header title="Visitors" />
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
        <UserList list={bookings} options={true} />
      </ScrollView>
    </Container>
  );
};

const UserList = ({ list, options }: any) => {
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
                    {item.item?.res?.name || ""}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                    {getDate(item.item.date.seconds).toDateString()}
                    {" → "}
                    {item.item.duration} days
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
                      source={CancelIcon}
                      resizeMode="contain"
                      style={{
                        height: 45,
                        width: 45,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <Image
                      source={DoneIcon}
                      resizeMode="contain"
                      style={{
                        height: 45,
                        width: 45,
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

export default AdminManageVisitors;
