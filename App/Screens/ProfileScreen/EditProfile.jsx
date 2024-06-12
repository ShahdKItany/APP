import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; // Import useSelector from React Redux
import IconAntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Colors from "../../Common/Utils/Colors";
import { selectToken } from "../../ReduxAndAsyncStorage/BookSlice"; // Import selector for token

const EditProfile = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector(selectToken); // Use useSelector to get the token from the Redux store

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://ecommercebackend-jzct.onrender.com/auth", {
          headers: {
            authorization: `AmanGRAD__${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);
        setEmail(userData.email);
       
        setPhoneNumber(userData.phoneNumber);
        
        setUserName(userData.username);
     
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        //Alert.alert("Failed to fetch user data", error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  console.log("Token:", token); // Print the token in the console

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email address");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const profileData = {
      username,
      email,
      phoneNumber,
      password,
    };

    try {
      let url = "https://ecommercebackend-jzct.onrender.com/auth/update";
      if (!isEditMode) {
        url = "https://ecommercebackend-jzct.onrender.com/auth/changePassword";
        profileData.oldPassword = currentPassword;
      }

      const response = await axios.patch(url, profileData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `AmanGRAD__${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        Alert.alert("Failed to update profile", response.data.message);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("Profile")}
          >
            <IconAntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo/logo.jpg")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>تعديل الملف الشخصي</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="الاسم"
            keyboardType="default"
            autoCapitalize="none"
            value={username}
            onChangeText={setUserName}
            editable={isEditMode}
          />
          <TextInput
            style={styles.input}
            placeholder="البريد الالكتروني"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={isEditMode}
          />
          <TextInput
            style={styles.input}
            placeholder="رقم الهاتف"
            keyboardType="phone-pad"
            maxLength={13}
            value={phoneNumber}
            onChangeText={(text) =>
              setPhoneNumber(text.replace(/[^0-9]/g, ""))
            }
            editable={isEditMode}
          />
          {isEditMode && (
            <>
              <TextInput
                style={styles.input}
                placeholder="كلمة المرور الحالية"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="كلمة المرور الجديدة"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="تأكيد كلمة المرور"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={isEditMode ? handleSaveProfile : handleToggleEditMode}
        >
          <Text style={styles.buttonText}>{isEditMode ? "حفظ" : "تعديل"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  headerContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  header: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#FFA000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffa500",
    margin: 10,
    marginBottom: 50,
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#0abae4",
    borderRadius: 10,
    textAlign: "right",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 60,
  },
  buttonText: {
    fontSize: 18,
    color: "white", // Ensure the text is white
    fontWeight: "bold",
  },
});

export default EditProfile;
