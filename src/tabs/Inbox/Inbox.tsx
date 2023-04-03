import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import {
  getAllVisitorBookings,
  getAllVisitorBookingsById,
} from "../../services/AdminServices";
import CancelIcon from "./../../../assets/icons/cancel.png";
import DoneIcon from "./../../../assets/icons/done.png";
// import { getAllServices } from "../../services/Services";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import Icon from "../../components/Icon/Icon";
import { approve } from "../../services/MessageService";
import { getStoreData } from "../../services/StorageService";
import { isAdmin } from "../../services/UserService";

const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};
const Inbox = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [selected, setSelected] = useState<string>("invitations");
  const [options, setOptions] = useState(false);

  useEffect(() => {
    (async () => {
      const creds = await getStoreData("user_creds");
      let bookings = isAdmin(creds)
        ? await getAllVisitorBookings()
        : await getAllVisitorBookingsById(creds?.token);
      switch (selected) {
        case "invitations":
          bookings = bookings?.filter(
            (item: any) =>
              getDate(item?.date?.seconds) > new Date() &&
              !item.approved &&
              !item.rejected
          );
          break;
        case "upcoming":
          bookings = bookings?.filter(
            (item: any) => getDate(item?.date?.seconds) > new Date()
          );
          break;
        case "past":
          bookings = bookings?.filter(
            (item: any) => getDate(item?.date?.seconds) <= new Date()
          );
          break;
      }
      bookings.sort((a: any, b: any) => {
        return (
          (getDate(b?.date?.seconds) as any) -
          (getDate(a?.date?.seconds) as any)
        );
      });
      setBookings(bookings);
      setOptions(selected === "invitations");
    })();
  }, [selected]);

  return (
    <Container style={common.container}>
      <Header title="Visitors" />
      <View style={{ flexDirection: "row" }}>
        {["invitations", "upcoming", "past"].map((item) => (
          <Pressable
            key={item}
            style={{ width: "33%", padding: 10 }}
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
        <InboxList list={bookings} options={options} />
      </ScrollView>
    </Container>
  );
};

const InboxList = ({ list, options }: any) => {
  const cardBackground = (item: any) =>
    item?.approved
      ? `${colors.green}33`
      : item?.rejected
      ? `${colors.peach}33`
      : `${colors.elevatedBackground}66`;
      
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={list}
        renderItem={(item) => {
          console.log();
          return (
            <Card style={{ backgroundColor: cardBackground(item?.item) }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={[common.text, common.md, common.textLabel]}>
                    {item.item?.visName || ""}
                  </Text>
                  <Text
                    style={[
                      common.text,
                      common.sm,
                      common.textLabel,
                      { color: colors.slategray },
                    ]}
                  >
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
                    <Icon
                      icon={CancelIcon}
                      onPress={() => approve(item?.item, false)}
                    />
                    <Icon
                      icon={DoneIcon}
                      onPress={() => approve(item?.item, true)}
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

export default Inbox;
