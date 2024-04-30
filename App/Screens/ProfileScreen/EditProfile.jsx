import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const EditProfile = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('shahd.kitany@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+970 59-364-7582');
  const [password, setPassword] = useState('shahd');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = () => {
    // Save logic here
    if (!validateEmail(email)) {
      Alert.alert('Invalid email address');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Implement logic to update user profile on the backend server securely

    // Alert user on success or failure
    Alert.alert('Profile updated successfully!');
    setIsEditMode(false);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Profile')}>
        <IconAntDesign name="arrowleft" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
      </View>

      <Text style={styles.title}>تعديل الملف الشخصي</Text>

      <View>
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
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
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

      <TouchableOpacity style={styles.button} onPress={isEditMode ? handleSaveProfile : handleToggleEditMode}>
        <Text style={styles.buttonText}>{isEditMode ? 'حفظ' : 'تعديل'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 10,
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    margin: 10,
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0abae4',
    borderRadius: 10,
    textAlign: 'right',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#ffa500',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfile;
