import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { Props } from "../../../router/stackNavigatorAfterOnboarding/StackNavigatorAfterOnboarding";
import CommonHeader from "../../../Components/UI/CommonHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../Components/Redux/Store";
import HotelListRow from "../../../Components/UI/HotelListRow";

const UserAlreadyBookScreen: React.FC<Props<"UserAlreadyBookScreen">> = ({
  navigation
}) => {
  const localSavedHotelListing = useSelector(
    (state: RootState) => state.savedHotelReducer.bookingListing
  );

  return (
    <SafeAreaView>
      <CommonHeader
        title={"User's Booked Hotel"}
        isBackButtonVisible={true}
        isBookingCounterVisible={false}
        bookingCount={0}
      />
      <FlatList
        data={ localSavedHotelListing }
        renderItem={({ item }) => (
          <HotelListRow data={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default UserAlreadyBookScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});