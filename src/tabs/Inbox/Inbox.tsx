import React, { useState } from "react";
import {
  FlatList,
  Image, Pressable, ScrollView, Text, View
} from "react-native";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import CancelIcon from "./../../../assets/icons/cancel.png";
import DoneIcon from "./../../../assets/icons/done.png";
import inboxJSON from "./../../../assets/json/inbox.json";

const Inbox = () => {
  const [inbox, setInbox] = useState(inboxJSON);
  // const [filteredInbox, setSelected] = useState<string>("pending");
  const [selected, setSelected] = useState<string>("pending");

  const filteredList = () => {
    let res;
    switch(selected){
      case "pending":
        res =  inbox?.filter(item=>item.approved == false);
        break
      case "upcoming":
        res =  inbox?.filter(item=>item.approved == true);
        break;
      case "past":
        res =  inbox?.filter(item=>item.approved == true);
        break;
    }
    console.log(res)  
    return res;
  }

  return (
    <Container style={common.container}>
      <Header title="Inbox"></Header>
      <View style={{ flexDirection: "row" }}>
        {["pending", "upcoming", "past"].map((item) => (
          <Pressable
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
        <InboxList list={filteredList()} options={selected=='pending'} />
      </ScrollView>
    </Container>
  );
};

const InboxList = ({ list, options }: any) => {
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={list}
        renderItem={(item) => {
          console.log(item);
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
                    {item.item.visitor_name}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                    {item.item.requested_date}
                    {" → "}
                    {item.item.no_of_days} days
                  </Text>
                </View>
                {options && (
                  <View
                    style={{
                      flexDirection: "row",
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

export default Inbox;
