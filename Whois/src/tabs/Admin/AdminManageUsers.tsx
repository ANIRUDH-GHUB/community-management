import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import common from "../../../constants/Styles";
import { colors } from "../../../constants/variables";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import { getAllUsers } from "../../services/AdminServices";
import EditIcon from "./../../../assets/icons/edit.png";
import DeleteIcon from "./../../../assets/icons/delete.png";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";
import Icon from "../../components/Icon/Icon";
import UserEdit from "./UserEditPopup";
import { USER } from "../../model/interfaces";
import Alert from "../../components/Alert/Alert";
import { deleteUserHelper } from "../../services/UserService";

const AdminManageUsers = () => {
  const [users, setUsers] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [showForm, setShowForm] = useState(false);

  const editUser = (item: any) => {
    setShowForm(true);
    setSelectedUser(item);
  };

  const onDelete = async (item: any) => {
    setShowForm(false);
    await deleteUserHelper(item);
    setRefresh(true);
  };

  useEffect(() => {
    (async () => {
      let users = await getAllUsers();
      users = users.filter((item: any) => item.role !== "admin");
      setUsers(users);
    })();
    setRefresh(false);
  }, [refresh, showForm]);

  return (
    <Container style={common.container}>
      <Header title="Users" />
      {showForm ? (
        <UserEdit
          user={selectedUser}
          onCancel={() => {
            setShowForm(false);
          }}
          onChange={() => {
            setShowForm(false);
            setRefresh(true);
          }}
        />
      ) : (
        <ScrollView>
          <UserList list={users} options={true} editUser={editUser} onDelete={onDelete} />
        </ScrollView>
      )}
    </Container>
  );
};

const UserList = ({ list, options, editUser, onDelete }: any) => {
  const [confirm, setConfirm] = useState({});
  return (
    <View style={{ marginTop: 15 }}>
      {list?.map((item: any, index: number) => (
        <Card key={index}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={[common.text, common.md]}>{item?.name || ""}</Text>
              <Text style={[common.text, common.sm]}>
                {item.dob}
                {" → "}
                {item.email}
              </Text>
            </View>
            {options && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon icon={EditIcon} onPress={() => editUser(item)} />
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

export default AdminManageUsers;
