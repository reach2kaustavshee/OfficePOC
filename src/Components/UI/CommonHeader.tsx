import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import { heightToDpi, widthToDpi } from "../../Utility/Dimensions";
import CommonHeaderBookingCounter from "./CommonHeaderBookingCounter";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../Redux/Store";
import { saveLoginStatus } from "../Redux/Login/LoginReducer";

export default function CommonHeader({
  title,
  isBackButtonVisible,
  bookingCount,
  isBookingCounterVisible
}: {
  title?: string | null;
  isBackButtonVisible: boolean;
  bookingCount?: number;
  isBookingCounterVisible: boolean;
}) {
  const TouchablePlatformSpecific:
    | typeof TouchableOpacity
    | typeof TouchableNativeFeedback =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  const navigation = useNavigation();
  const localSavedHotelListing = useSelector((state: RootState) => state.savedHotelReducer.bookingListing);
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleStyle}>{title}</Text>
      {isBackButtonVisible && (
        <TouchablePlatformSpecific
          style={styles.backButtonStyle}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Image
            source={require("../../../assets/back_arrow.png")}
            style={{ width: 25, height: 20, marginLeft: 24 }}
          />
        </TouchablePlatformSpecific>
      )}
      {isBookingCounterVisible &&
        bookingCount !== undefined &&
        bookingCount > 0 && (
          <TouchablePlatformSpecific
            style={{ position: "absolute", right: widthToDpi(20) }}
            onPress={() => {
              navigation.navigate("UserAlreadyBookScreen");
            }}
          >
            <CommonHeaderBookingCounter count={bookingCount} />
          </TouchablePlatformSpecific>
        )}
        <TouchablePlatformSpecific
          style={{ position: "absolute", right: widthToDpi(4) }}
          onPress={() => {
            dispatch(saveLoginStatus(null));
          }}
        >
          <Image
            source={require("../../../assets/logout.png")}
            style={{ width: 25, height: 20, marginLeft: 24 }}
          />
        </TouchablePlatformSpecific>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f8f4f4",
    width: widthToDpi("100%"),
    height: heightToDpi("8%"),
    flexDirection: "row",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: widthToDpi("5%"),
    width: "75%",
    textAlign: "center",
    color: "#000000"
  },
  backButtonStyle: {
    position: "absolute",
    marginLeft: widthToDpi(4)
  }
});
