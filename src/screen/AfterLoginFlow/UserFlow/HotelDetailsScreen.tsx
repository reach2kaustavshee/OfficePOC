import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import CommonHeader from "../../../Components/UI/CommonHeader";

import { Props } from "../../../router/stackNavigatorAfterOnboarding/StackNavigatorAfterOnboarding";
import MapScreen from "./MapScreen";
import { useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  useAppDispatch
} from "../../../Components/Redux/Store";
import {
  acceptBookingRequest,
  cancelBookingFromAdminHotelList,
  createBookNowRequest,
  rejectBookingRequest
} from "../../../Components/Redux/Hotel/HotelLocalReducer";

const HotelDetailsScreen: React.FC<Props<"HotelDetailsScreen">> = ({
  navigation,
  route
}) => {
  const { item } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.login.loginUserType);
  const localSavedHotelListing = useSelector(
    (state: RootState) => state.savedHotelReducer.bookingListing
  );
  const localDBItem = localSavedHotelListing?.filter((obj) => {
    return obj.id === item?.id;
  })[0];
  const modifiedItem = {
    id: item?.id,
  photos: item?.photos,
  address: item?.address,
  title: item?.title,
  rating: item?.rating,
  description: item?.description,
  pricePerNight: item?.pricePerNight,
  geoPoint: item?.geoPoint,
  amenities: item?.amenities,
  status: (localDBItem === undefined || localDBItem === null) ? item?.status : localDBItem.status
  }
  const dispatch: AppDispatch = useAppDispatch();
  const countToShow = localSavedHotelListing.filter((obj) => {
    if (user === "User") {
      if (
        obj.status !== null
      ) {
        return true;
      }
      return false;
    } else if (user === "Admin") {
      if (obj.status === "Pending Confirmation") {
        return true;
      }
      return false;
    }
  }).length;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAcceptBookingPress = () => {
    // This one is for admin
    if (item !== undefined) {
      dispatch(acceptBookingRequest(item));
    }
  };

  const handleRejectBookingPress = () => {
    // This one is for admin
    if (item !== undefined) {
      dispatch(rejectBookingRequest(item));
    }
  };

  const handleCancelBookingPress = () => {
    // This one is for user
    if (item !== undefined) {
      dispatch(cancelBookingFromAdminHotelList(item));
    }
  };

  const handleUserBookNowPress = () => {
    // This one is for user
    if (item !== undefined) {
      dispatch(createBookNowRequest(item));
    }
  };

  return (
    <SafeAreaView>
      <CommonHeader
        title={"Hotel Details"}
        isBackButtonVisible={true}
        isBookingCounterVisible={user === "User" ? true : false}
        bookingCount={user === "User" ? countToShow : 0}
      />
      <ScrollView>
        <View>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.text}>{item?.title} 📍</Text>
          </TouchableOpacity>
          <MapScreen
            isVisible={isModalVisible}
            latitude={item?.geoPoint?.latitude ?? 0}
            longitude={item?.geoPoint?.longitude ?? 0}
            hotelAddress={item?.address ?? ""}
            hotelName={item?.title ?? ""}
            onClose={toggleModal}
          />
          <Image
            source={{
              uri: item?.photos
            }}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.subtext}>
            About Hotel: {item?.description}
          </Text>
          <Text style={styles.subtext}>Ratings : ★ {item?.rating}</Text>
          <Text style={styles.subtext}>
            Amenities : {item?.amenities}
          </Text>
          <Text style={styles.subtext}>Address : {item?.address}</Text>
          <Text style={styles.subtext}>
            Price per night : {item?.pricePerNight} /-
          </Text>
          {user === "Admin" &&
            localDBItem !== undefined &&
            !(
              localDBItem?.status === "Accepted" ||
              localDBItem.status === "Rejected"
            ) && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAcceptBookingPress}
                >
                  <Text style={styles.buttonText}>Accept Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRejectBookingPress}
                >
                  <Text style={styles.buttonText}>Reject Booking</Text>
                </TouchableOpacity>
              </View>
            )}
          {user === "Admin" &&
            localDBItem !== undefined &&
            (localDBItem?.status === "Accepted" ||
              localDBItem.status === "Rejected") && (
              <View
                style={[
                  styles.buttonContainer,
                  { width: "100%", justifyContent: "center" }
                ]}
              >
                <Text
                  style={{ color: "red", fontSize: 30, textAlign: "center" }}
                >
                  {localDBItem.status}
                </Text>
              </View>
            )}

          {user === "User" &&
            modifiedItem !== undefined &&
            (modifiedItem?.status === "Accepted" ||
              modifiedItem.status === "Rejected") && (
              <View
                style={[
                  styles.buttonContainer,
                  { width: "100%", justifyContent: "center" }
                ]}
              >
                <Text
                  style={{ color: "red", fontSize: 30, textAlign: "center" }}
                >
                  {modifiedItem.status}
                </Text>
              </View>
            )}

          {user === "User" &&
            modifiedItem !== undefined &&
            !(
              modifiedItem?.status === "Accepted" ||
              modifiedItem.status === "Rejected"
            ) && (
              <View>
                { modifiedItem?.status !== "Pending Confirmation" && (
                  <TouchableOpacity
                    style={styles.buttonReserve}
                    onPress={handleUserBookNowPress}
                  >
                    <Text style={styles.buttonText}>Book Now</Text>
                  </TouchableOpacity>
                )}
                { modifiedItem?.status === "Pending Confirmation" && (
                  <TouchableOpacity
                    style={styles.buttonReserve}
                    onPress={handleCancelBookingPress}
                  >
                    <Text style={styles.buttonText}>Cancel Booking</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
        </View>
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    width: "100%",
    paddingStart: 12,
    paddingEnd: 12,
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold"
  },
  subtext: {
    marginTop: 16,
    width: "100%",
    paddingStart: 12,
    paddingEnd: 12,
    color: "#000000",
    fontSize: 16
  },
  image: {
    marginTop: 16,
    width: "95%",
    marginStart: 12,
    marginEnd: 12,
    height: 280
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 24,
    marginStart: 12,
    marginEnd: 12
  },
  button: {
    backgroundColor: "#d49cd0", // Button color
    padding: 15,
    borderRadius: 5,
    flex: 1, // Make buttons take equal space
    marginHorizontal: 5 // Add horizontal margin
  },
  buttonText: {
    color: "#FFFFFF", // Text color
    textAlign: "center",
    fontSize: 16
  },
  buttonReserve: {
    backgroundColor: "#d49cd0", // Button color
    padding: 15,
    borderRadius: 5,
    flex: 1, // Make buttons take equal space
    marginHorizontal: 14, // Add horizontal margin
    marginVertical: 16
  }
});
