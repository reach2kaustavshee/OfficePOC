import * as React from "react";
import LoginScreen from "../../screen/OnboardingFlow/LoginScreen";
import RegistrationScreen from "../../screen/OnboardingFlow/RegistrationScreen";
import { widthToDpi } from "../../Utility/Dimensions";
import ForgotPasswordScreen from "../../screen/OnboardingFlow/ForgotPasswordScreen";
import ResetPasswordScreen from "../../screen/OnboardingFlow/ResetPasswordScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator();

const RegistrationStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Group>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerShown: false,
              title: "ForgotPassword Screen",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontSize: widthToDpi("7%"),
              },
            }}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{
              headerShown: false,
              title: "ResetPassword Screen",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontSize: widthToDpi("7%"),
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RegistrationStackNavigator;
