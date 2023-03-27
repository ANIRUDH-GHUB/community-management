import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Container from "../../components/Container/Container";
import common from "../../../constants/Styles";
import Card from "../../components/Card/Card";
import styles from "./styles";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { getAllServices } from "../../services/Services";
import { SERVICETYPE } from "../../model/interfaces";

const Services = () => {
  const [services, setServices] = useState<SERVICETYPE[]>([]);

  useEffect(() => {
    const response = getAllServices() 
    if(response) {
     setServices(response)
    }
  }, []);

  return (
    <Container style={styles.m_20}>
      <Text
        style={[common.text, common.md, common.center, { paddingBottom: 10 }]}
      >
        Services
      </Text>
      <Button>Add Services</Button>
      {
         respon

      }

     
    </Container>
  );
};

export default Services;
