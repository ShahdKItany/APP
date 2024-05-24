// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import Colors from '../../Common/Utils/Colors';

// const ForgotPassword = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   //const [confirmPassword, setConfirmPassword] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [error, setError] = useState('');
//   const [isCodeSent, setIsCodeSent] = useState(false);

//   const handleRequestVerificationCode = () => {
//     if (email === '') {
//       setError('الرجاء إدخال بريدك الإلكتروني');
//     } else {
//       setError('');
//       setIsCodeSent(true);
//     }
//   };

//   const handleResetPassword = () => {
//     if (password === '' || verificationCode === '' ) {
//       setError('الرجاء إدخال كلمة المرور الجديدة والكود');
//     } 
    
//     // else if (password !== confirmPassword) {
//     //   setError('تأكيد كلمة المرور غير متطابقة');
//     // } 
    
//     else if (!isValidPassword(password)) {
//       setError('يجب أن تحتوي كلمة المرور على الأقل  على 8 أحرف وأرقام');
//     } 
    
//     else {
//       axios.post(' https://ecommercebackend-jzct.onrender.com/auth/forgetPassword', { email, password, verificationCode })
//         .then(response => {
//           navigation.navigate('ResetPasswordSuccess');
//         })
//         .catch(error => {
//           setError('فشل في إعادة تعيين كلمة المرور');
//         });
//     }
//   };

//   const isValidPassword = (password) => {
//     // Password should be at least 8 characters long and contain both letters and numbers
//     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.inner}>
//         <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />

//         <Text style={styles.title}>إعادة تعين كلمة المرور</Text>
//         {error !== '' && <Text style={styles.error}>{error}</Text>}

//         <View style={styles.inputContainer}>
//           <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="أدخل  رقم الهاتف أو البريد الالكتروني"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {isCodeSent && (
//           <>
//             <View style={styles.inputContainer}>
//               <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="أدخل كلمة المرور الجديدة"
//                 secureTextEntry={true}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//             </View>
//             {/* <View style={styles.inputContainer}>
//               <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="تأكيد كلمة المرور"
//                 secureTextEntry={true}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//             </View> */}
//             <View style={styles.inputContainer}>
//               <Icon name="key" size={20} color="#0abae4" style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="ادخل الكود هنا"
//                 value={verificationCode}
//                 onChangeText={setVerificationCode}
//               />
//             </View>
//           </>
//         )}

//         {!isCodeSent && (
//           <TouchableOpacity style={styles.button} onPress={handleRequestVerificationCode}>
//             <Text style={styles.buttonText}>تلقي الكود</Text>
//           </TouchableOpacity>
//         )}

//         {isCodeSent && (
//           <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//             <Text style={styles.buttonText}> تأكيد  </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 50,
//   },
//   inner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     height: 40,
//     flex: 1,
//     textAlign: 'right',
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 100,
//     resizeMode: 'contain',
//     borderWidth: 1,
//     borderColor: '#FFA000',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffa500',
//     marginVertical: 20,
//   },
// error: {
//   fontSize: 16,
//   color:Colors.PINK,
//   marginVertical: 10,
//   textAlign: 'center', // Align text in the center
// },

//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#0abae4',
//     borderRadius: 10,
//     marginVertical: 10,
//     padding: 5,
//     width: 300,
//   },
//   button: {
//     width: '70%',
//     height: 40,
//     backgroundColor:Colors.ORANGE,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   buttonText: {
//     fontSize: 20,
//     color:Colors.WHITE,
//     fontWeight: 'bold',
//   },
// });

// export default ForgotPassword;




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
  //const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestVerificationCode = async () => {
    if (email === '') {
      setError('الرجاء إدخال بريدك الإلكتروني');
      console.log('Error: Email is empty');
    } else {
      setError('');
      setLoading(true);
      console.log('Sending verification code...');

      let timeoutId = setTimeout(() => {
        setLoading(false);
        setError('حدثت مشكلة في إرسال الكود، حاول مرة أخرى');
        console.log('Error: Timeout - Verification code not sent');
        Alert.alert( 'حدثت مشكلة في إرسال الكود، حاول مرة أخرى');
      }, 100000); // 10 ثواني

      try {
        await axios.post('https://ecommercebackend-jzct.onrender.com/auth/sendCode', { email });
        clearTimeout(timeoutId);
        setIsCodeSent(true);
        console.log('Success: Verification code sent');
        Alert.alert( 'تم إرسال الكود بنجاح');
      } catch (error) {
        clearTimeout(timeoutId);
        setError('فشل في إرسال الكود , حاول مرة أخرى .');
        console.log('Error: Failed to send verification code', error);
       // Alert.alert( 'فشل في إرسال الكود');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (password === '' || verificationCode === '') {
      setError('الرجاء إدخال كلمة المرور الجديدة والكود');
      console.log('Error: Password or verification code is empty');
    } else if (!isValidPassword(password)) {
      setError('يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف وأرقام');
      console.log('Error: Password does not meet criteria');
    } else {
      setError('');
      setLoading(true);
      console.log('Resetting password...');

      try {
        await axios.post('https://ecommercebackend-jzct.onrender.com/auth/forgetPassword', { email, password, verificationCode });
        console.log('Success: Password reset');
        navigation.navigate('ResetPasswordSuccess');
      } catch (error) {
        setError('فشل في إعادة تعيين كلمة المرور');
        console.log('Error: Failed to reset password', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const isValidPassword = (password) => {
    // Password should be at least 8 characters long and contain both letters and numbers
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

        <Text style={styles.title}>إعادة تعين كلمة المرور</Text>
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
          <>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="أدخل كلمة المرور الجديدة"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {/* <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="تأكيد كلمة المرور"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View> */}
            <View style={styles.inputContainer}>
              <Icon name="key" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="ادخل الكود هنا"
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
              <Text style={styles.buttonText}>تلقي الكود</Text>
            )}
          </TouchableOpacity>
        )}

        {isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>تأكيد</Text>
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
