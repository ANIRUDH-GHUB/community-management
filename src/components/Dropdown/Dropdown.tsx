import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DropdownInterface {
  value: any;
  setValue: any;
  placeHolder?: string;
  data: { label: string; value: any }[];
  user?: boolean;
}

const DropdownComponent: React.FC<DropdownInterface> = (props) => {
  const { data, value, setValue, placeHolder, user } = props;

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeHolder || "Select"}
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() =>
        user ? (
          <AntDesign style={styles.icon} color="black" name="user" size={20} />
        ) : (
          <MaterialCommunityIcons
            name="sort-numeric-variant"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        )
      }
    />
  );
};

DropdownComponent.defaultProps = {
  placeHolder: "Select item",
  user: true,
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
