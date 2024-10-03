import React from "react";
import { Image, Text, View } from "react-native";

export default function CommonHeaderBookingCounter({
  count
}: {
  count: Number;
}) {
  return (
    <View style={{ height: "100%" }}>
      <Image
        source={require("../../../assets/hotel_booking.png")}
        style={{ width: 25, height: 20, marginTop: 20 }}
      />
      <Text
        style={{
          position: "absolute",
          top: 9,
          right: -12,
          borderColor: "red",
          borderWidth: 1,
          width: 20,
          height: 20,
          borderRadius: 10,
          color: "red",
          textAlign:"center"
        }}
      >
        {count}
      </Text>
    </View>
  );
}
