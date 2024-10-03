import React from "react";
import { HotelItem } from "../Redux/Hotel/HotelReducer";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../router/stackNavigatorAfterOnboarding/StackNavigatorAfterOnboarding";

export default function HotelListRow({
  data,
  navigation
}: {
  data?: HotelItem;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "HotelListingScreen"
  >;
}) {
  const handleNavigation = () => {
    navigation.navigate("HotelDetailsScreen", { item: data });
  };
  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: data?.photos }} style={styles.image} />
        <Text style={styles.itemText}>{data?.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0eeed",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },

  itemText: {
    fontSize: 16,
    width: "75%",
    color: "#000000"
  }
});
