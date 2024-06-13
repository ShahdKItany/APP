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
import { useSelector } from "react-redux";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Colors from "../../Common/Utils/Colors";
import { selectToken } from "../../ReduxAndAsyncStorage/BookSlice";

// Mock function for getUserFromToken
const getUserFromToken = (token) => {
  // Replace this with your logic to decode token and get user data
  return {
    username: "mockUser",
    email: "mock@example.com",
    phone: "1234567890",
    password: "hashedPassword", // Replace with actual hashed password
  };
};

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
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://ecommercebackend-jzct.onrender.com/user/profile",
          {
            headers: {
              authorization: `AmanGRAD__${token}`,
            },
          }
        );
        const userData = response.data.user;
        console.log("User Data:", userData);
        setUserData(userData);
        setEmail(userData.email);
        setPhoneNumber(userData.phone);
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

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setChangePasswordMode(false);
  };

  const handleToggleChangePassword = () => {
    setChangePasswordMode(!changePasswordMode);
  };

  const handleSaveProfile = async () => {
    if (!currentPassword) {
      Alert.alert("الرجاء إدخال كلمة المرور الحالية");
      return;
    }
  
    if (changePasswordMode && password !== confirmPassword) {
      Alert.alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }
  
    try {
      // Get user data from token
      const user = getUserFromToken(token);
  
      if (!user) {
        Alert.alert("لم يتم العثور على المستخدم");
        return;
      }
  
      // Check if current password matches
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        Alert.alert("كلمة المرور الحالية غير صحيحة");
        return;
      }
  
      // Prepare the updated profile data
      const updatedData = {
        username,
        email,
        phone: phoneNumber,
      };
  
      if (changePasswordMode) {
        updatedData.password = password;
      }
  
      // Save profile changes
      await axios.put(
        "https://ecommercebackend-jzct.onrender.com/user/profile",
        updatedData,
        {
          headers: {
            authorization: `AmanGRAD__${token}`,
          },
        }
      );
  
      Alert.alert("تم حفظ التغييرات بنجاح");
      setIsEditMode(false);
      setChangePasswordMode(false);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      Alert.alert("حدث خطأ أثناء حفظ التغييرات");
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
            placeholder={userData ? userData.username : "الاسم"}
            keyboardType="default"
            autoCapitalize="none"
            value={username}
            onChangeText={setUserName}
            editable={isEditMode}
          />
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.email : "البريد الالكتروني"}
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
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور الحالية"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          {isEditMode && !changePasswordMode && (
            <TouchableOpacity
              style={styles.changePasswordContainer}
              onPress={handleToggleChangePassword}
            >
              <IconAntDesign name="lock" size={20} color={Colors.PINK} />
              <Text style={styles.changePasswordText}>تغيير كلمة المرور</Text>
            </TouchableOpacity>
          )}
          {changePasswordMode && (
            <>
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
          <View style={styles.buttonContent}>
            <IconAntDesign
              name={isEditMode ? "save" : "edit"}
              size={24}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isEditMode ? "   حفظ " : "تعديل"}
            </Text>
          </View>
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
    justifyContent    : "center",
    padding: 16,
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  changePasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  changePasswordText: {
    color: Colors.PINK,
    marginLeft: 5,
    fontSize: 17,
    textDecorationLine: "underline",
  },
});

export default EditProfile;