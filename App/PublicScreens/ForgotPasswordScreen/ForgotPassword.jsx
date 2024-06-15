




















































import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Colors from '../../Common/Utils/Colors';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestVerificationCode = async () => {
    if (email === '') {
      setError('الرجاء إدخال بريدك الإلكتروني');  //enter your email
      console.log('Error: Email is empty');
    } else {
      setError('');
      setLoading(true);
      console.log('Sending verification code...');

      let timeoutId = setTimeout(() => {
        setLoading(false);
        setError('There was a problem sending the code, please try again');
        console.log('Error: Timeout - Verification code not sent');
        Alert.alert('There was a problem sending the code, please try again');
      }, 10000); // 10 seconds

      try {
        const response = await axios.patch('https://ecommercebackend-jzct.onrender.com/auth/sendCode', { email });
        console.log('Response:', response.data); // Log the response data
        clearTimeout(timeoutId);
        setIsCodeSent(true);
        console.log('Success: Verification code sent');
        Alert.alert('The code has been sent successfully');
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.response) {
          console.log('Error data:', error.response.data);
          console.log('Error status:', error.response.status);
          console.log('Error headers:', error.response.headers);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
        setError('Failed to send the code, please try again.');
        console.log('Error: Failed to send verification code', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (password === '' || verificationCode === '') {
      setError('الرجاء إدخال كلمة المرور الجديدة والكود');   //enter new password and code
      console.log('Error: Password or verification code is empty');
      return;
    }

    if (!isValidPassword(password)) {
      setError('يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف وأرقام'); //Password must contain at least 8 letters and numbers'
      console.log('Error: Password does not meet criteria');
      return;
    }

    setError('');
    setLoading(true);
    console.log('Resetting password...');

    let attempts = 0;
    const maxAttempts = 3;
    const retryDelay = 1000; // 1 second

    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`Attempt ${attempts} to reset password...`);
        await axios.patch('https://ecommercebackend-jzct.onrender.com/auth/forgetPassword', { email, password, code: verificationCode });
        console.log('Success: Password reset');
        navigation.navigate('ResetPasswordSuccess');
        setLoading(false);
        return; // Exit the loop and function after successful reset
      } catch (error) {
        if (error.response && (error.response.status === 502 || error.response.status === 503)) {
          console.log(`Error: ${error.response.status} ${error.response.data.message}, retrying attempt ${attempts}...`);
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempts)); // Exponential backoff
          } else {
            console.log('Max attempts reached, could not reset password.');
            setError('فشل في إعادة تعيين كلمة المرور');
          }
        } else {
          console.log('Error: Failed to reset password', error);
          setError('فشل في إعادة تعيين كلمة المرور');
          break; // Exit the loop if not a 502 or 503 error
        }
      }
    }
    setLoading(false);
  };

  const isValidPassword = (password) => {
    const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    console.log('Password validation:', valid);
    return valid;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        {/* Password Reset */}
        <Text style={styles.title}>إعادة تعيين كلمة المرور</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الهاتف أو البريد الإلكتروني" //"Enter phone number or email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {isCodeSent && (
          <>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="أدخل كلمة المرور الجديدة" //enter new password
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="key" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="ادخل الكود هنا" //enter the code here
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
            </View>
          </>
        )}

        {!isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleRequestVerificationCode} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ارسال الكود</Text> //send code
            )}
          </TouchableOpacity>
        )}

        {isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>تأكيد</Text> // to be sure
            )}
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 50,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    textAlign: 'right',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FFA000',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    marginVertical: 20,
  },
  error: {
    fontSize: 16,
    color: Colors.PINK,
    marginVertical: 10,
    textAlign: 'center', // Align text in the center
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0abae4',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    width: 300,
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;