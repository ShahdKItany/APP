


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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

const EditProfile = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/user", {
          headers: {
            authorization:
              "AmanGRAD__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDdiMDk0ZTIwMGRhNTIzZTU4OWU3MiIsInJvbGUiOiJBZG1pbiIsInN0YXR1cyI6IkFjdGl2YXRlZCIsImlhdCI6MTcxNjQxMDkxMH0.tnRasV2O9eQOeCf5-5OhxS3FOF_-JLLaxx1-U6Ynmks",
          },
        });
        const userData = response.data;
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        // Assuming password is not fetched for security reasons
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        Alert.alert("Failed to fetch user data", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = async () => {
    // Validate inputs
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

    // Prepare data for the server
    const profileData = {
      username,
      email,
      phoneNumber,
      password,
    };

   

    try {
      const response = await axios.patch(
        "http://localhost:3000/auth/update",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization:
              "AmanGRAD__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDdiMDk0ZTIwMGRhNTIzZTU4OWU3MiIsInJvbGUiOiJBZG1pbiIsInN0YXR1cyI6IkFjdGl2YXRlZCIsImlhdCI6MTcxNjQxMDkxMH0.tnRasV2O9eQOeCf5-5OhxS3FOF_-JLLaxx1-U6Ynmks",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        Alert.alert("Failed to update profile", response.data.message);
        //console.log(response.data.message);
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
    <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
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

      <View>
      <TextInput
          style={styles.input}
          placeholder=" الاسم"
          keyboardType="username"
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
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
          editable={isEditMode}
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={isEditMode}
        />
        <TextInput
          style={styles.input}
          placeholder="تأكيد كلمة المرور"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={isEditMode}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={isEditMode ? handleSaveProfile : handleToggleEditMode}
      >
        <Text style={styles.buttonText}>{isEditMode ? "حفظ" : "تعديل"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
    padding: 16,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  headerContainer: {
    width: "100%",
    alignItems: "flex-start",
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
    backgroundColor: "#ffa500",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 60,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditProfile;
