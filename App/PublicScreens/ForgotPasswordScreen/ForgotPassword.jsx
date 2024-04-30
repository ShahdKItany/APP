
// ForgotPassword.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestVerificationCode = () => {
    if (email === '') {
      setError('الرجاء إدخال بريدك الإلكتروني');
    } else {
      setError('');
      const randomCode = generateRandomCode();
      setIsCodeSent(true);
    }
  };

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(7).toUpperCase();
  };

  const handleResetPassword = () => {
    if (verificationCode === 'shahd') {
      setError('');
      navigation.navigate('ResetPassword');
    } else {
      setError('الكود غير صحيح');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />

        <Text style={styles.title}>نسيت كلمة المرور</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="أدخل  رقم الهاتف أو البريد الالكتروني"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {isCodeSent && (
          <View style={styles.inputContainer}>
            <Icon name="key" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="ادخل الكود هنا"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
          </View>
        )}

        {!isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleRequestVerificationCode}>
            <Text style={styles.buttonText}>تلقي الكود</Text>
          </TouchableOpacity>
        )}

        {isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}> تأكيد  </Text>
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
    alignItems: 'center', // تم تغيير القيمة هنا
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
    color: '#f93a8f',
    marginVertical: 10,
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
    backgroundColor: '#ffa500',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
