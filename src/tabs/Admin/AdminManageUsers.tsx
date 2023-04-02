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
import { getAllUsers } from "../../services/AdminServices";
import EditIcon from "./../../../assets/icons/edit.png";
// import { getAllServices } from "../../services/Services";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";


const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};
const AdminManageUsers = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let users = await getAllUsers();
      console.log("All users", users);
      setUsers(users);
    })();
  }, []);

  return (
    <Container style={common.container}>
      <Header title="Users" />
      <ScrollView>
        <UserList list={users} options={true} />
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
                    {item.item?.name || ""}
                  </Text>
                  <Text style={[common.text, common.sm]}>
                    {item.item.dob}
                    {" → "}
                    {item.item.email} 
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
                      source={EditIcon}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
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


export default AdminManageUsers;
