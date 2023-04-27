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
// import { getAllServicesById } from "../../services/Services";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import Icon from "../../components/Icon/Icon";
import { approve } from "../../services/MessageService";
import { getStoreData } from "../../services/StorageService";
import { isAdmin } from "../../services/UserService";
import { fromToday, getDateTime } from "../../utils/dateUtil";
import Alert from "../../components/Alert/Alert";

const Inbox = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [selected, setSelected] = useState<string>("invitations");
  const [refresh, setRefresh] = useState(false);

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
            fromToday(getDateTime(item?.date?.seconds)) &&
              !item.approved &&
              !item.rejected
          );
          break;
        case "upcoming":
          bookings = bookings?.filter((item: any) =>
            fromToday(getDateTime(item?.date?.seconds))
          );
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
      if (selected !== "past") bookings = bookings.reverse();
      setBookings(bookings);
      setRefresh(false);
    })();
  }, [selected, refresh]);

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
        <InboxList
          list={bookings}
          options={selected !== "past"}
          onChange={() => setRefresh(true)}
        />
      </ScrollView>
    </Container>
  );
};

const InboxList = ({ list, options, onChange }: any) => {
  const [confirm, setConfirm] = useState<any>({});
  const updateApproval = async (item: any, val: boolean) => {
    await approve(item, val);
    onChange();
  };
  const cardBackground = (item: any) =>
    item?.approved
      ? `${colors.green}33`
      : item?.rejected
      ? `${colors.peach}33`
      : `${colors.elevatedBackground}66`;

  return (
    <View style={{ marginTop: 15 }}>
      <View>
        {list.map((item: any, index: number) => (
          <Card
            style={{ backgroundColor: cardBackground(item) }}
            key={`${item.visId}${index}`}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={[common.text, common.md, common.textLabel]}>
                  {item?.visName || ""}
                </Text>
                <Text
                  style={[
                    common.text,
                    common.sm,
                    common.textLabel,
                    { color: colors.slategray },
                  ]}
                >
                  {getDateTime(item?.date?.seconds).toDateString()}
                  {" → "}
                  {item?.duration} days
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
                    onPress={() => {
                      setConfirm({ item, val: false });
                    }}
                  />
                  <Icon
                    icon={DoneIcon}
                    onPress={() => {
                      setConfirm({ item, val: true });
                    }}
                  />
                </View>
              )}
            </View>
          </Card>
        ))}
      </View>
      <Alert
        show={confirm && Object.keys(confirm).length > 0}
        onClose={() => setConfirm(() => ({}))}
        onConfirm={() => {
          setConfirm(() => ({}));
          updateApproval(confirm?.item, confirm?.val);
        }}
      ></Alert>
    </View>
  );
};

export default Inbox;
