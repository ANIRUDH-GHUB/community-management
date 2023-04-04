import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import React, { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  Platform,
  View,
} from "react-native";
import { deleteApartment } from "../../services/AdminServices";
import { useSelector } from "react-redux";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import Header from "../../components/Header/Header";
import { USER } from "../../model/interfaces";
import { getAllApartments } from "../../services/AdminServices";
import DeleteIcon from "./../../../assets/icons/delete.png";
import inboxJSON from "./../../../assets/json/inbox.json";
import styles from "./styles";
import { visitorBookings } from "../../services/MessageService";
import ApartmentPopup from "./ApartmentPopup";
import Icon from "../../components/Icon/Icon";
import Alert from "../../components/Alert/Alert";

const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let apartments = await getAllApartments();
      setApartments(apartments);
    })();
  }, [showForm]);

  return (
    <Container style={common.container}>
      <Header title="Apartments"></Header>
      <Button onPress={() => setShowForm(true)}>Add Apartment</Button>
      <ScrollView>
        <ApartmentList list={apartments} options={true} />
      </ScrollView>
      <ApartmentPopup showForm={showForm} setShowForm={setShowForm} />
    </Container>
  );
};

const ApartmentList = ({ list, options }: any) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>("");

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
                    Unit: {item.item?.unitName || ""}
                  </Text>
                  <Text
                    style={[
                      common.text,
                      common.sm,
                      common.textLabel,
                      { color: colors.slategray },
                    ]}
                  >
                    {getDate(item?.item?.date?.seconds)?.toDateString()}
                    {" → "}
                    {item?.item?.floor}th floor
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
                      icon={DeleteIcon}
                      onPress={() => {
                        setConfirm(true);
                        setSelectedItem(item?.item);
                      }}
                    />
                  </View>
                )}
              </View>
            </Card>
          );
        }}
      />
      <Alert
        show={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          deleteApartment(selectedItem);
          setConfirm(false);
        }}
      ></Alert>
    </View>
  );
};

export default Apartment;
