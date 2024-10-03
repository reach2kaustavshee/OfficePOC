import React, {useState} from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, View, Alert,TextInput, ImageBackground, SafeAreaView, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router/stackNavigatorOnboarding/RouterOnboarding';

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'RegistrationScreen'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

const RegistrationScreen:React.FC<Props>=({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]=useState('');
  const [phone, setPhone]=useState('');
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const validateName = (name: string) => {
    return name.length >= 6; // Minimum 6 characters
  };

  const validatePhoneNumber = (phone: string) => {
    const regex = /^[0-9]{10}$/; // Validates a 10-digit phone number
    return regex.test(phone);
  };

  const handleSignUp = async() => {
    if(!validateName(name)){
      Alert.alert('Invalid name', 'Please enter a full name.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Invalid password', 'Password must be at least 6 characters long.');
      return;
    }
    if (!validatePhoneNumber(phone)) {
      Alert.alert('Invalid phone number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    Alert.alert('SignUp successful', 'You have successfully signed up.');

    //logic for signup
    navigation.pop();
  };

  const handleLogin = async() => {
    //logic to login
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          source={{uri:'https://i.pinimg.com/564x/e6/13/70/e6137041d90a0b453555a52fe4aeac17.jpg'}} // image URL
          style={styles.image}
          imageStyle={styles.imageOpacity} // Apply opacity to the image
          resizeMode="cover">
          <Text style={styles.text}>Get Started</Text>
          <Text style={styles.subtext}>by creating an account</Text>
          <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Full Name" 
            placeholderTextColor="#888" 
            value={name}
            onChangeText={setName}></TextInput>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Email address" 
            placeholderTextColor="#888" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"></TextInput>  
          <TextInput 
            style={styles.input} 
            placeholder="Enter Phone number" 
            placeholderTextColor="#888" 
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"></TextInput>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Password" 
            placeholderTextColor="#888" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry></TextInput>
          <View>
            <TouchableOpacity style={[styles.button]} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textA}>Already have an account?
          <TouchableOpacity onPress={handleLogin}>
             <Text style={styles.clickableText}>Log in</Text>
          </TouchableOpacity>
          </Text>

          </View>
          </ImageBackground>
        </View>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  image:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  imageOpacity:{
    opacity: 0.7, // Set the opacity level here
  },
  text:{
    marginTop:64,
    textAlign:'center',
    width: '85%',
    marginHorizontal:24,
    color:'#000000',
    fontSize:34,
  },
  subtext:{
    textAlign:'center',
    width: '85%',
    marginHorizontal:24,
    color:'#000000',
    fontSize:10,
  },
  card: {
    backgroundColor: '#fff',       // Background color for the card
    padding: 20,                   // Padding inside the card
    margin: 20,                    // Margin around the card
    borderRadius: 15,              // Rounded corners
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  input: {
    height: 40,
    marginTop:12,
    borderColor: '#ccc',
    color:'#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#d49cd0', // Lavender color
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginStart:24,
    marginEnd:24,
    marginTop:24,
  },
  buttonText: {
    color: '#000000', // White text color
    fontSize: 16,
  },
  textA: {
    fontSize: 16,
    color: '#000000',
    margin: 8,                    // Margin around the card

  },
  clickableText: {
    color: 'red',
    textDecorationLine: 'underline',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'space-evenly',
    marginLeft:8,
    marginTop:4,
    fontSize:18,
  },

})
