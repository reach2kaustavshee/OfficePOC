import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/core";
import HotelListingScreen from "../../screen/AfterLoginFlow/UserFlow/HotelListingScreen";
import HotelDetailsScreen from "../../screen/AfterLoginFlow/UserFlow/HotelDetailsScreen";
import HotelBookingScreen from "../../screen/AfterLoginFlow/UserFlow/HotelBookingScreen";
import { HotelItem } from "../../Components/Redux/Hotel/HotelReducer";
import UserAlreadyBookScreen from "../../screen/AfterLoginFlow/UserFlow/UserAlreadyBookScreen";

export type RootStackParamList = {
  HotelListingScreen: undefined;
  HotelDetailsScreen: {
    item?: HotelItem;
  };
  HotelBookingScreen: undefined;
  UserAlreadyBookScreen:undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const Stack = createNativeStackNavigator();

const StackNavigatorAfterOnboarding = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="HotelListingScreen"
            component={HotelListingScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="HotelDetailsScreen"
            component={HotelDetailsScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="HotelBookingScreen"
            component={HotelBookingScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="UserAlreadyBookScreen"
            component={UserAlreadyBookScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigatorAfterOnboarding;
