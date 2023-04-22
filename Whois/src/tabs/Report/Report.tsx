import { Pressable, ScrollView, Text, View } from "react-native";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

import { useEffect, useState } from "react";
import { activitiesLabel, colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import {
  deleteActivity,
  getAllActivities,
} from "../../services/ResidentServices";
import { fromToday, getDateTime } from "../../utils/dateUtil";
import ReportPopup from "./ReportPopup";
import EditIcon from "./../../../assets/icons/edit.png";
import DeleteIcon from "./../../../assets/icons/delete.png";
import Icon from "../../components/Icon/Icon";
import Alert from "../../components/Alert/Alert";

const Report = () => {
  const [activities, setActivities] = useState<[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("upcoming");
  const [activity, selectedActivity] = useState();
  const [refresh, setRefresh] = useState(false);

  const editActivity = (item: any) => {
    setShowForm(true);
    item.date = getDateTime(item?.date?.seconds);
    selectedActivity(item);
  };
  const onDelete = async (item: any) => {
    setShowForm(false);
    item.date = getDateTime(item?.date?.seconds);
    await deleteActivity(item);
    setRefresh(true);
  };

  useEffect(() => {
    (async () => {
      let activities = await getAllActivities();
      switch (selected) {
        case "upcoming":
          activities = activities?.filter((item: any) =>
            fromToday(getDateTime(item?.date?.seconds))
          );
          break;
        case "past":
          activities = activities?.filter(
            (item: any) => !fromToday(getDateTime(item?.date?.seconds))
          );
          break;
      }
      activities.sort((a: any, b: any) => {
        return (
          (getDateTime(b?.date?.seconds) as any) -
          (getDateTime(a?.date?.seconds) as any)
        );
      });
      if (selected === "upcoming") activities = activities.reverse();
      setActivities(activities);
    })();
    setRefresh(false);
  }, [selected, showForm, refresh]);

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
        <ServiceList
          list={activities}
          options={selected !== 'past'}
          editActivity={editActivity}
          onDelete={onDelete}
          setRefresh={setRefresh}
        />
      </ScrollView>
      <ReportPopup
        showForm={showForm}
        setShowForm={setShowForm}
        onChange={() => setRefresh(true)}
        activity={activity}
      />
    </Container>
  );
};

const ServiceList = ({
  list,
  options,
  editActivity,
  onDelete,
}: any) => {
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
                <Text
                  style={[
                    common.text,
                    common.md,
                    common.textLabel,
                    common.capital,
                  ]}
                >
                  {item.activity}
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
                  <Icon icon={EditIcon} onPress={() => editActivity(item)} />
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

export default Report;
