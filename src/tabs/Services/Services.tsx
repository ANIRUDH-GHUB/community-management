import { Text, View } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import styles from "./styles";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
// import { getAllServices } from "../../services/Services";
import res from './../../../assets/json/residentservices.json'
import { SERVICETYPE } from "../../model/interfaces";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header/Header";

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const Services = () => {
  const [services, setServices] = useState<SERVICETYPE[]>([]);

  useEffect(() => {
    const response = res;
    if (response) {
      setServices(response);
    }
  }, []);

  return (
    <Container>
      <Header title="Services" />
      <Button>Request Services</Button>
      <FlatList
        data={services}
        renderItem={(item) => {
          console.log(item);
          return (
            <Card>
              <Text style={[common.md]}>{item.item.service_name}</Text>
              <Text style={[common.sm]}>{item.item.requested_date}</Text>
            </Card>
          );
        }}
      />
    </Container>
  );
};

export default Services;
