import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { deleteApartment } from "../../services/AdminServices";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { getAllApartments } from "../../services/AdminServices";
import EditIcon from "./../../../assets/icons/edit.png";
import DeleteIcon from "./../../../assets/icons/delete.png";
import ApartmentPopup from "./ApartmentPopup";
import Icon from "../../components/Icon/Icon";
import Alert from "../../components/Alert/Alert";
import { getDateTime } from "../../utils/dateUtil";

const Apartment = () => {
  const [apartments, setApartments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedApartment, setSelectedApartment] = useState();
  const [refresh, setRefresh] = useState(false);

  const editApartment = (item: any) => {
    setShowForm(true);
    item.date = getDateTime(item?.date?.seconds);
    setSelectedApartment(item);
  };
  const onDelete = async (item: any) => {
    setShowForm(false);
    item.date = getDateTime(item?.date?.seconds);
    await deleteApartment(item);
    setRefresh(true);
  };

  useEffect(() => {
    (async () => {
      let apartments = await getAllApartments();
      setRefresh(false);
      setApartments(apartments);
    })();
    setRefresh(false);
  }, [showForm, refresh]);

  return (
    <Container style={common.container}>
      <Header title="Apartments"></Header>
      <Button onPress={() => setShowForm(true)}>Add Apartment</Button>
      <ScrollView>
        <ApartmentList
          list={apartments}
          options={true}
          editApartment={editApartment}
          onDelete={onDelete}
        />
      </ScrollView>
      <ApartmentPopup
        showForm={showForm}
        setShowForm={setShowForm}
        onChange={() => setRefresh(true)}
        apartment={selectedApartment}
      />
    </Container>
  );
};

const ApartmentList = ({ list, options, editApartment, onDelete }: any) => {
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
                    {getDateTime(item?.item?.date?.seconds)?.toDateString()}
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
                      icon={EditIcon}
                      onPress={() => {
                        editApartment(item?.item);
                        setSelectedItem(item?.item);
                      }}
                      bgColor="#4681f480"
                    />
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
          onDelete(selectedItem);
          setConfirm(false);
        }}
      ></Alert>
    </View>
  );
};

export default Apartment;
