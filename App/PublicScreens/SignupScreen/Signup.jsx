

// SignUp.jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (email === '' || phone === '' || password === '' || confirmPassword === '') {
      setError('يرجى التأكد من إدخال معلوماتك بشكل صحيح');
    } else if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
    } else {
      setError('');
      Alert.alert('Sign up successful', 'تم إنشاء الحساب بنجاح', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // تغيير القيمة حسب الحاجة
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Login')}>
            <IconAntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        </View>

        <Text style={styles.title}>إنشاء الحساب </Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="البريد الالكتروني"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="رقم الهاتف"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>إنشاء حساب</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text>
              <Text style={{ color: '#0abae4' }}>  هل لديك حساب ؟</Text>
              <Text> </Text>
              <Text style={{ color: '#f93a8f' }}>دخول </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  backButton: {
    color: '#0abae4',
    fontSize: 18,
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    margin: 10,
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: '#f93a8f',
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0abae4',
    borderRadius: 10,
    margin: 10,
    padding: 5,
    width: 300,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
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
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    marginTop: 50,
  },
});

export default Signup;
