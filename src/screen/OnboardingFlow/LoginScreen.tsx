import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../router/stackNavigatorOnboarding/RouterOnboarding";
import { AppDispatch, useAppDispatch } from "../../Components/Redux/Store";
import { saveLoginStatus } from "../../Components/Redux/Login/LoginReducer";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useAppDispatch();
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum 6 characters
  };

  function handleLogin() {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 6 characters long."
      );
      return;
    }
    if (email === "admin@gmail.com") {
      dispatch(saveLoginStatus("Admin"));
    } else {
      dispatch(saveLoginStatus("User"));
    }
  }

  const handleForgotPass = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleSignUp = () => {
    navigation.navigate("RegistrationScreen");
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/564x/e6/13/70/e6137041d90a0b453555a52fe4aeac17.jpg",
          }} // image URL
          style={styles.image}
          imageStyle={styles.imageOpacity} // Apply opacity to the image
          resizeMode="cover"
        >
          <Text style={styles.text}>Welcome to Travin</Text>
          <Text style={styles.subtext}>
            start the journey by logging into your account
          </Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            ></TextInput>
            <View>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.textSignup}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgotPass}>
              <Text style={styles.textReset}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imageOpacity: {
    opacity: 0.7, // Set the opacity level here
  },
  text: {
    marginTop: 64,
    textAlign: "center",
    width: "85%",
    marginHorizontal: 24,
    color: "#000000",
    fontSize: 34,
  },
  subtext: {
    textAlign: "center",
    width: "85%",
    marginHorizontal: 24,
    color: "#000000",
    fontSize: 10,
  },
  card: {
    backgroundColor: "#fff", // Background color for the card
    padding: 20, // Padding inside the card
    margin: 20,
    marginVertical: 25, // Margin around the card
    borderRadius: 15, // Rounded corners
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderColor: "#ccc",
    color: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#d49cd0", // Lavender color
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginStart: 24,
    marginEnd: 24,
    marginTop: 24,
  },
  buttonText: {
    color: "#000000", // White text color
    fontSize: 16,
  },
  textReset: {
    fontSize: 16,
    color: "red",
    textDecorationLine: "underline",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 8, // Margin around the card
  },
  textSignup: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 12, // Margin around the card
  },
});
