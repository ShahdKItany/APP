import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '../../redux/BookSlice'; // Import the saveToken function from BookSlice
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { selectToken } from '../../redux/BookSlice'; // Import the selectToken selector from BookSlice

const Signin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const token = useSelector(selectToken); // Retrieve token from Redux state

  const handleLogin = async () => {
    try {
      if (email === '' || password === '') {
        setError('يرجى التأكد من إدخال معلوماتك بشكل صحيح');
      } else {
        setError('');
        const response = await axios.post('https://ecommercebackend-jzct.onrender.com/auth/login', {
          email,
          password
        });

        const { token, message } = response.data;

        if (token) {
          dispatch(saveToken(token)); // Save token to Redux state
          navigation.navigate('Home'); // Navigate to Home screen after successful login
       console.log(token);
        } else {
          setError(message || 'حدث خطأ أثناء عملية تسجيل الدخول');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('حدث خطأ أثناء عملية تسجيل الدخول');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
      </View>

      <Text style={styles.title}>تسجيل الدخول</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="البريد الالكتروني أو رقم الهاتف"
            value={email}
            onChangeText={setEmail}
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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>هل نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> تسجيل الدخول  <Icon name="sign-in" size={20} color="white" /></Text>
      </TouchableOpacity>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.bottomCreateAccount}>
            <Text style={{ color: '#0abae4' }}>ليس لديك حساب؟</Text>
            <Text> </Text>
            <Text style={{ color: '#f93a8f' }}>انشاء حساب</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
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
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: '#f93a8f',
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    marginTop: 50,
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
  link: {
    color: '#f93a8f',
    textAlign: 'center',
    margin: 10,
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
    marginTop: 40,
  },
  bottomCreateAccount: {
    marginTop: 70,
  },
});

export default Signin;
