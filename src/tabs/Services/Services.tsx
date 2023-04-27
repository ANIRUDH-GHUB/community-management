import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import common from "../../../constants/Styles";
import { colors, serviceLabels } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import {
  getAllServicesById,
  deleteService,
  getAllServices,
} from "../../services/ResidentServices";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import EditIcon from "./../../../assets/icons/edit.png";
import DeleteIcon from "./../../../assets/icons/delete.png";
import RequestServciePopup from "./RequestServciePopup";
import { fromToday, getDateTime } from "../../utils/dateUtil";
import Icon from "../../components/Icon/Icon";
import Alert from "../../components/Alert/Alert";
import { getStoreData } from "../../services/StorageService";
import { isAdmin } from "../../services/UserService";

const Services = () => {
  const [services, setServices] = useState<any>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");
  const [service, selectedService] = useState();
  const [role, setRole] = useState("resident");
  const [refresh, setRefresh] = useState(false);

  const editService = (item: any) => {
    setShowForm(true);
    item.date = getDateTime(item?.date?.seconds);
    selectedService(item);
  };
  const onDelete = async (item: any) => {
    setShowForm(false);
    item.date = getDateTime(item?.date?.seconds);
    await deleteService(item);
    setRefresh(true);
  };

  useEffect(() => {
    (async () => {
      const creds = await getStoreData("user_creds");
      let services = isAdmin(creds)
        ? await getAllServices()
        : await getAllServicesById();
      setRole(creds.role);
      switch (selected) {
        case "upcoming":
          services = services?.filter((item: any) =>
            fromToday(getDateTime(item?.date?.seconds))
          );
          break;
        case "past":
          services = services?.filter(
            (item: any) => !fromToday(getDateTime(item?.date?.seconds))
          );
          break;
      }
      services.sort((a: any, b: any) => {
        return (
          (getDateTime(b?.date?.seconds) as any) -
          (getDateTime(a?.date?.seconds) as any)
        );
      });
      if (selected === "upcoming") services = services.reverse();
      setServices(services);
      setRefresh(false);
    })();
  }, [selected, showForm, refresh]);

  return (
    <Container style={common.container}>
      <Header title="Services" />
      <View>
        {!isAdmin({ role: role }) && (
          <Button onPress={() => setShowForm(true)}>Request Services</Button>
        )}
      </View>
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
        <ServiceList
          list={services}
          options={selected !== "past"}
          editService={editService}
          onDelete={onDelete}
          setRefresh={setRefresh}
        />
      </ScrollView>
      <RequestServciePopup
        showForm={showForm}
        setShowForm={setShowForm}
        onChange={() => setRefresh(true)}
        service={service}
      />
    </Container>
  );
};

const ServiceList = ({ list, options, editService, onDelete }: any) => {
  const [confirm, setConfirm] = useState({});
  return (
    <View style={{ marginTop: 15 }}>
      {list &&
        list?.map((item: any, index: number) => (
          <Card key={index}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={[common.text, common.md, common.textLabel]}>
                  {serviceLabels[item?.service] || ""}
                </Text>
                <Text
                  style={[
                    common.text,
                    common.sm,
                    common.textLabel,
                    { color: colors.policeBlue },
                  ]}
                >
                  {item?.description || ""}
                </Text>
                <Text
                  style={[
                    common.text,
                    common.sm,
                    common.textLabel,
                    { color: colors.slategray },
                  ]}
                >
                  {getDateTime(item.date.seconds).toDateString()}
                </Text>
              </View>
              {options && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon icon={EditIcon} onPress={() => editService(item)} />
                  <Icon icon={DeleteIcon} onPress={() => setConfirm(item)} />
                </View>
              )}
            </View>
          </Card>
        ))}
      <Alert
        show={confirm && Object.keys(confirm).length > 0}
        onClose={() => setConfirm(() => ({}))}
        onConfirm={() => {
          setConfirm(() => ({}));
          onDelete(confirm);
        }}
      ></Alert>
    </View>
  );
};

export default Services;
