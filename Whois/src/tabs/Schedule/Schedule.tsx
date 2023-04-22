import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import EditIcon from "./../../../assets/icons/edit.png";
import SchedulePopup from "./SchedulePopup";
import { visitorBookings } from "../../services/MessageService";
import Icon from "../../components/Icon/Icon";
import { fromToday, getDateTime } from "../../utils/dateUtil";

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");
  const [booking, selectedBooking] = useState();
  const [refresh, setRefresh] = useState(false);

  const editBooking = (item: any) => {
    setShowForm(true);
    item.date = getDateTime(item?.date?.seconds);
    selectedBooking(item);
  };

  useEffect(() => {
    (async () => {
      let bookings = await visitorBookings();
      switch (selected) {
        case "upcoming":
          bookings = bookings
            ?.filter((item: any) => fromToday(getDateTime(item?.date?.seconds)))
          break;
        case "past":
          bookings = bookings?.filter(
            (item: any) => !fromToday(getDateTime(item?.date?.seconds))
          );
          break;
      }
      bookings.sort((a: any, b: any) => {
        return (
          (getDateTime(b?.date?.seconds) as any) -
          (getDateTime(a?.date?.seconds) as any)
        );
      });
      if(selected === "upcoming") bookings = bookings.reverse()
      setBookings(bookings);
      setRefresh(false);
    })();
    if (!showForm) selectedBooking(undefined);
  }, [selected, showForm, refresh]);

  return (
    <Container style={common.container}>
      <Header title="Schedule"></Header>
      <Button onPress={() => setShowForm(true)}>Schedule Visit</Button>
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
        <ScheduleList
          list={bookings}
          options={true}
          editBooking={editBooking}
        />
      </ScrollView>
      <SchedulePopup
        showForm={showForm}
        setShowForm={setShowForm}
        booking={booking}
        onChange={() => setRefresh(true)}
      />
    </Container>
  );
};

const ScheduleList = ({ list, options, editBooking }: any) => {
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
                  <Text
                    style={[
                      common.text,
                      common.md,
                      common.textLabel,
                      common.bold,
                    ]}
                  >
                    UNIT: {item.item?.res?.unit || ""}
                  </Text>
                  <Text
                    style={[
                      common.text,
                      common.md,
                      common.textLabel,
                      common.thin,
                      common.capital,
                      { color: colors.slategray },
                    ]}
                  >
                    Resident: {item.item?.res?.name || ""}
                  </Text>
                  <Text
                    style={[
                      common.text,
                      common.sm,
                      common.textLabel,
                      { color: colors.slategray },
                    ]}
                  >
                    {getDateTime(item?.item?.date?.seconds).toDateString()}
                    {" → "}
                    {item.item.duration}
                  </Text>
                </View>
                {options && (
                  <Icon
                    icon={EditIcon}
                    onPress={() => editBooking(item?.item)}
                  />
                )}
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default Schedule;
