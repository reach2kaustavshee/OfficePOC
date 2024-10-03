import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  useAppDispatch,
  RootState,
  AppDispatch
} from "../../../Components/Redux/Store";
import { fetchHotelList } from "../../../Components/Redux/Hotel/HotelReducer";
import HotelListRow from "../../../Components/UI/HotelListRow";
import CommonHeader from "../../../Components/UI/CommonHeader";
import { Props } from "../../../router/stackNavigatorAfterOnboarding/StackNavigatorAfterOnboarding";
import { fetchLocalSavedHotelList } from "../../../Components/Redux/Hotel/HotelLocalReducer";

const HotelListingScreen: React.FC<Props<"HotelListingScreen">> = ({
  navigation
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const hotelList = useSelector(
    (state: RootState) => state.hotelReducer.listing
  );
  const user = useSelector((state: RootState) => state.login.loginUserType);
  const localSavedHotelListing = useSelector(
    (state: RootState) => state.savedHotelReducer.bookingListing
  );
  const adminListing = localSavedHotelListing.filter((item) => {
    if (item.status == "Pending Confirmation") {
      return true;
    }
    return false;
  });
  const countToShow = localSavedHotelListing.filter((item) => {
    if (user === "User") {
      if (
        item.status !== null
      ) {
        return true;
      }
      return false;
    } else if (user === "Admin") {
      if (
        item.status === "Pending Confirmation"
      ) {
        return true;
      }
      return false;
    }
  }).length;


  useEffect(() => {
    dispatch(fetchHotelList());
    dispatch(fetchLocalSavedHotelList());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader
        title={"User's Hotel Listing"}
        isBackButtonVisible={false}
        isBookingCounterVisible={(user === "User") ? true : false}
        bookingCount={countToShow}
      />
      <FlatList
        data={ user === "Admin" ? adminListing : hotelList}
        renderItem={({ item }) => (
          <HotelListRow data={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default HotelListingScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
