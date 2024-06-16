
/*

import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectBooksInCart, clearCart } from '../../ReduxAndAsyncStorage/BookSlice';
import Colors from '../../Common/Utils/Colors';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const OrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [street, setStreet] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regionPickerOpen, setRegionPickerOpen] = useState(false);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [townPickerOpen, setTownPickerOpen] = useState(false);

  

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    setCity('');
    setTown('');
  };

  

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    setTown('');
  };

  const getTownLabel = () => {
    return town ? town : 'اضغط لاختيار البلدة';
  };

  const handlePurchase = () => {
    if (!region  ) {
      Alert.alert( 'يرجى اختيار المنطقة لإكمال الشراء');
      return;
    }

    if (!city) {
      Alert.alert( 'يرجى اختيار المدينة لإكمال الشراء');
      return;
    }

    if (!town) {
      Alert.alert( 'يرجى اختيار البلدة لإكمال الشراء');
      return;
    }
    
    if (!street) {
      Alert.alert( 'يرجى اختيار الشارع لإكمال الشراء');
      return;
    }
   
    if (!phoneNumber) {
      Alert.alert( 'يرجى إدخال رقم الهاتف ');
      return;
    }

    Alert.alert(
      'تأكيد الشراء',
      'هل ترغب في إكمال عملية الشراء؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'موافق',
          onPress: () => completePurchase(),
        },
      ]
    );
  };

  const completePurchase = () => {
    dispatch(clearCart());
    Alert.alert( 'تمت ارسال طلبك بنجاح!');
    //navigation.goBack();
    navigation.navigate('Home'); 

  };

  const getCityOptions = () => {
    switch (region) {
      case 'الضفة الغربية':
        return ['رام الله', 'نابلس', 'طولكرم', 'جنين', 'سلفيت', 'بيت لحم', 'أريحا', 'الخليل', 'قلقيلية'];
      case 'الداخل المحتل':
        return ['Jaffa', 'Haifa', 'Lod', 'Acre'];
      case 'القدس':
        return ['القدس الشرقية', 'ضواحي القدس'];
      default:
        return [];
    }
  };

  const getTownOptions = () => {
    switch (city) {
      case 'طولكرم':
        return ['اكتابا', 'الجاروشية', 'الحسبة', 'الحفاصي', 'الراس', 'المسقوفة', 'النزلة الشرقية', 'النزلة الغربية', 'النزلة الوسطى', 'باقة الشرقية', 'بلعا', 'بيت ليد', 'خربة جبارة', 'دير الغصون', 'رامين', 'زيتا', 'سفارين', 'شوفة', 'صيدا', 'عتيل', 'عزبة الخلال', 'عزبة شوفة', 'عكابة', 'علار', 'عنبتا', 'فرعون', 'قفين', 'كفا', 'كفر اللبد', 'كفر جمال', 'كفر زيباد', 'كفر صور', 'كفر عبوش', 'كور', 'مخيم نور شمس', 'مخيم طولكرم', 'مدينة طولكرم', 'نزلة عيسى'];
      case 'نابلس':
        return ['يتما', 'ياصيد', 'نصف جبيل', 'مجدل بني فاضل', 'مادما', 'كفر قليل', 'قوصين', 'قصرة', 'قريوت', 'قبلان', 'فروش بيت دجن', 'عين شبلي', 'عينوس', 'عوريف', 'عورتا', 'عمورية', 'عقربا', 'عصيرة القبلية', 'عصيرة الشمالية', 'عزموط', 'عراق بورين', 'طلوزة', 'مرة', 'سبيسطية', 'سالم', 'زيتا جماعين', 'زواتا', 'دوجين', 'دير شرف', 'دير الحطب', 'دوما', 'خلة النعمان', 'حوارة', 'جورديش', 'جماعين', 'جالود', 'تلفيت', 'تل', 'بيت وزن', 'بيت فوريك', 'بيت رجن', 'بيت حسن', 'بيت ايبا', 'بيت امرين', 'بيتا', 'بورين', 'بزاريا', 'اوصرين', 'اودلا', 'الناصرية', 'الناقورة', 'اللبن الشرقية', 'العقربانية', 'الساوية', 'الباذان', 'اجنسنيا'];
      case 'جنين':
        return ['يعبد'];
      case 'رام الله':
        return ['رام الله'];
      case 'سلفيت':
        return ['سلفيت'];
      case 'بيت لحم':
        return ['بيت لحم'];
      case 'أريحا':
        return ['أريحا'];
      case 'الخليل':
        return ['الخليل'];
      case 'قلقيلية':
        return ['قلقيلية'];
      case 'ضواحي القدس':
        return ['ضواحي القدس'];
      case 'القدس الشرقية':
        return ['القدس'];
      default:
        return [];
    }
  };

  const getDeliveryCharge = () => {
    switch (region) {
      case 'الضفة الغربية':
        return 10;
      case 'الداخل المحتل':
        return 30;
      case 'القدس':
        return 20;
      default:
        return 0;
    }
  };

  const deliveryCharge = getDeliveryCharge();
  const totalPriceBeforeDiscount = books.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0) + deliveryCharge;
  let totalPriceAfterDiscount = totalPriceBeforeDiscount;
  if (discountCode === 'shahd1') {
    totalPriceAfterDiscount *= 0.75; // Apply 25% discount
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
        
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="clipboard-outline" size={24} color={Colors.WHITE} style={styles.titleIcon} />
            <Text style={styles.title}>ملخص الطلب</Text>
          </View>

        
          <View style={styles.booksContainer}>
            {books && books.map((item, index) => (
              <View key={index}>
                <View style={styles.bookContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.bookImage} />
                  </View>
                  <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{item.title}</Text>
                    <Text style={styles.bookText}>الكمية: {item.quantity}</Text>
                    <Text style={styles.bookText}>السعر: {item.price} شيكل</Text>
                  </View>
                </View>
                {index < books.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

         
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setRegionPickerOpen(!regionPickerOpen)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { fontSize: 18 }]}> المنطقة: {region ? region : ' اضغط لاختيار المنطقة'} </Text>
                <MaterialCommunityIcons name="map-marker" size={20} color={Colors.BLUE} style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>
          </View>

          {regionPickerOpen && (
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={region}
                onValueChange={(itemValue) => {
                  setRegion(itemValue);
                  handleRegionChange(itemValue);
                  setRegionPickerOpen(false); // Close the picker upon selection
                }}
                style={styles.picker}
              >
                <Picker.Item label="القدس" value="القدس" />
                <Picker.Item label="الضفة الغربية" value="الضفة الغربية" />
                <Picker.Item label="الداخل المحتل" value="الداخل المحتل" />
              </Picker>
            </View>
          )}

     
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setCityPickerOpen(!cityPickerOpen)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { fontSize: 18 }]}> المدينة: {city ? city : ' اضغط لاختيار المدينة'} </Text>
                <MaterialCommunityIcons name="map-marker" size={20} color={Colors.ORANGE} style={{ marginLeft: 10 }} />
              </View>
            </TouchableOpacity>
          </View>

          {cityPickerOpen && (
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={city}
                onValueChange={(itemValue) => {
                  setCity(itemValue);
                  handleCityChange(itemValue);
                  setCityPickerOpen(false); // Close the picker upon selection
                }}
                style={styles.picker}
              >
                {getCityOptions().map((cityOption, index) => (
                  <Picker.Item key={index} label={cityOption} value={cityOption} />
                ))}
              </Picker>
            </View>
          )}

       
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setTownPickerOpen(!townPickerOpen)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { fontSize: 18 }]}> البلدة: {town ? town : ' اضغط لاختيار البلدة'} </Text>
                <MaterialCommunityIcons name="map-marker" size={20} color={Colors.PINK} style={{ marginLeft: 10 }} />
              </View>
            </TouchableOpacity>
          </View>

          {townPickerOpen && (
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={town}
                onValueChange={(itemValue) => {
                  setTown(itemValue);
                  setTownPickerOpen(false); // Close the picker upon selection
                }}
                style={styles.picker}
              >
                {getTownOptions().map((townOption, index) => (
                  <Picker.Item key={index} label={townOption} value={townOption} />
                ))}
              </Picker>
            </View>
          )}

         
          <Text style={styles.label}>الحي أو الشارع:</Text>
          <TextInput
            placeholder="الحي أو الشارع"
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
          />

       
          <Text style={styles.label}>أدخل رقم الهاتف:</Text>
          <TextInput
            placeholder="رقم الهاتف"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            style={styles.input}
            keyboardType="phone-pad"
          />

        
          <Text style={styles.label}>أدخل كود الخصم:</Text>
          <TextInput
            placeholder="كود الخصم"
            value={discountCode}
            onChangeText={(text) => setDiscountCode(text)}
            style={styles.input}
          />

      
          <View style={styles.priceContainer}>
            <Text style={styles.textRight}>التوصيل:</Text>
            <Text>{deliveryCharge} شيكل</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.textRight}>قيمة الطلب قبل الخصم:</Text>
            <Text>{totalPriceBeforeDiscount} شيكل</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.textRight}>قيمة الطلب بعد الخصم:</Text>
            <Text>{totalPriceAfterDiscount} شيكل</Text>
          </View>

          <View style={styles.divider} />

          
          <View style={styles.priceContainer}>
            <Text style={styles.textRight}>المجموع الكلي (شامل التوصيل):</Text>
            <Text style={[styles.totalPriceText, { fontWeight: 'bold' }]}>{totalPriceAfterDiscount} شيكل</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handlePurchase}
          >
            <MaterialCommunityIcons name="send-circle" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أرسل الطلب </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100, // Adjust width as needed
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.PINK,
    borderRadius: 10,
    padding: 10,
  },
  titleIcon: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  booksContainer: {
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.BLUE,
    borderRadius: 10,
    padding: 2,
  },
  bookImage: {
    width: 50,
    height: 50,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookText: {
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    flex: 1,
    marginBottom: 5,
    textAlign: 'right',
  },
  picker: {
    width: '100%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 8,
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textRight: {
    textAlign: 'right',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.ORANGE,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OrderScreen;



*/




/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';
const OrderScreen = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      fetchOrderDetails();
    }
  }, [token]);

  const fetchTokenFromStorage = async () => {
    try {
      const userToken = await getToken();
      setToken(userToken);
      console.log('Retrieved token:', userToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  

  const fetchOrderDetails = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDQwOGNhZDU5YjYzM2M4ODI2MWZkNSIsInJvbGUiOiJVc2VyIiwic3RhdHVzIjoiQWN0aXZhdGVkIiwiaWF0IjoxNzE1ODkwODc0fQ.NaQANglfn_3LV_u2E85ryzWq9qDBE6ykZCHDdT8t2W4'; // Replace with your actual authorization token
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/order/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `AmanGRAD__${token}`,
        },
      });

      if (response.data.message === 'success') {
        setOrderDetails(response.data.order); // Assuming response.data.order contains the order details
      } else {
        console.error('Failed to fetch order details:', response.data);
        Alert.alert('Error', 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error.message);
      Alert.alert('Error', 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Failed to fetch order details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Screen</Text>
      <View style={styles.orderDetails}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{orderDetails.orderId}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{orderDetails.address}</Text>
        <Text style={styles.label}>Coupon Used:</Text>
        <Text style={styles.value}>{orderDetails.couponName}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{orderDetails.phone}</Text>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  orderDetails: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OrderScreen;
*/










import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity
 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'; // assuming axios is installed and imported

const OrderScreen = ({ navigation }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [street, setStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const [regionPickerOpen, setRegionPickerOpen] = useState(false);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [townPickerOpen, setTownPickerOpen] = useState(false);

  useEffect(() => {
    fetchTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      fetchOrderDetails();
    }
  }, [token]);

  const fetchTokenFromStorage = async () => {
    try {
      // Simulated async storage retrieval, replace with actual logic
      const userToken = 'your_user_token_here'; // replace with actual token retrieval logic
      setToken(userToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      // Assuming this is your API endpoint to fetch order details
      const response = await axios.get('https://api.example.com/order/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
      Alert.alert('خطأ', 'حدثت مشكلة في جلب تفاصيل الطلب، يرجى المحاولة مرة أخرى لاحقًا.');
    }
  };

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    setCity('');
    setTown('');
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    setTown('');
  };

  const getTownLabel = () => {
    return town ? town : 'اضغط لاختيار البلدة';
  };

  const handlePurchase = () => {
    if (!region) {
      Alert.alert('يرجى اختيار المنطقة لإكمال الشراء');
      return;
    }

    if (!city) {
      Alert.alert('يرجى اختيار المدينة لإكمال الشراء');
      return;
    }

    if (!town) {
      Alert.alert('يرجى اختيار البلدة لإكمال الشراء');
      return;
    }

    if (!street) {
      Alert.alert('يرجى اختيار الشارع لإكمال الشراء');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('يرجى إدخال رقم الهاتف');
      return;
    }

    Alert.alert(
      'تأكيد الشراء',
      'هل ترغب في إكمال عملية الشراء؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'موافق',
          onPress: () => completePurchase(),
        },
      ]
    );
  };

  const completePurchase = () => {
    // Implement your logic for completing the purchase here
    Alert.alert('تمت ارسال طلبك بنجاح!');
    // Assuming clearCart() is a Redux action creator
    // dispatch(clearCart());
    // Assuming navigation object is passed as prop from react-navigation
    navigation.navigate('Home');
  };

  const getCityOptions = () => {
    switch (region) {
      case 'الضفة الغربية':
        return [
          'رام الله',
          'نابلس',
          'طولكرم',
          'جنين',
          'سلفيت',
          'بيت لحم',
          'أريحا',
          'الخليل',
          'قلقيلية',
        ];
      case 'الداخل المحتل':
        return ['Jaffa', 'Haifa', 'Lod', 'Acre'];
      case 'القدس':
        return ['القدس الشرقية', 'ضواحي القدس'];
      default:
        return [];
    }
  };
const getTownOptions = () => {
  switch (city) {
    case 'طولكرم':
      return [
        'اكتابا',
        'الجاروشية',
        'الحسبة',
        'الحفاصي',
        'الراس',
        'المسقوفة',
        'النزلة الشرقية',
        'النزلة الغربية',
        'النزلة الوسطى',
        'باقة الشرقية',
        'بلعا',
        'بيت ليد',
        'خربة جبارة',
        'دير الغصون',
        'رامين',
        'زيتا',
        'سفارين',
        'شوفة',
        'صيدا',
        'عتيل',
        'عزبة الخلال',
        'عزبة شوفة',
        'عكابة',
        'علار',
        'عنبتا',
        'فرعون',
        'قفين',
        'كفا',
        'كفر اللبد',
        'كفر جمال',
        'كفر زيباد',
        'كفر صور',
        'كفر عبوش',
        'كور',
        'مخيم نور شمس',
        'مخيم طولكرم',
        'مدينة طولكرم',
        'نزلة عيسى',
      ];
    case 'نابلس':
      return [
        'يتما',
        'ياصيد',
        'نصف جبيل',
        'مجدل بني فاضل',
        'مادما',
        'كفر قليل',
        'قوصين',
        'قصرة',
        'قريوت',
        'قبلان',
        'فروش بيت دجن',
        'عين شبلي',
        'عينوس',
        'عوريف',
        'عورتا',
        'عمورية',
        'عقربا',
        'عصيرة القبلية',
        'عصيرة الشمالية',
        'عزموط',
        'عراق بورين',
        'طلوزة',
        'مرة',
        'سبيسطية',
        'سالم',
        'زيتا جماعين',
        'زواتا',
        'دوجين',
        'دير شرف',
        'دير الحطب',
        'دوما',
        'خلة النعمان',
        'حوارة',
        'جورديش',
        'جماعين',
        'جالود',
        'تلفيت',
        'تل',
        'بيت وزن',
        'بيت فوريك',
        'بيت رجن',
        'بيت حسن',
        'بيت ايبا',
        'بيت امرين',
        'بيتا',
        'بورين',
        'بزاريا',
        'اوصرين',
        'اودلا',
        'الناصرية',
        'الناقورة',
        'اللبن الشرقية',
        'العقربانية',
        'الساوية',
        'الباذان',
        'اجنسنيا',
      ];
    default:
      return [];
  }
};

const renderPickerOptions = (options) => {
  return options.map((option, index) => (
    <Picker.Item key={index} label={option} value={option} />
  ));
};

return (
  <ScrollView style={styles.container}>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الموقع</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>المنطقة</Text>
            <Picker
              style={styles.picker}
              selectedValue={region}
              onValueChange={(itemValue) => handleRegionChange(itemValue)}
            >
              <Picker.Item label="اختر المنطقة" value="" />
              <Picker.Item label="الضفة الغربية" value="الضفة الغربية" />
              <Picker.Item label="الداخل المحتل" value="الداخل المحتل" />
              <Picker.Item label="القدس" value="القدس" />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>المدينة</Text>
            <Picker
              style={styles.picker}
              selectedValue={city}
              onValueChange={(itemValue) => handleCityChange(itemValue)}
            >
              <Picker.Item label="اختر المدينة" value="" />
              {renderPickerOptions(getCityOptions())}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>البلدة</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setTownPickerOpen(true)}
            >
              <Text>{getTownLabel()}</Text>
            </TouchableOpacity>
            <Picker
              style={[styles.picker, { display: townPickerOpen ? 'flex' : 'none' }]}
              selectedValue={town}
              onValueChange={(itemValue) => setTown(itemValue)}
              onClose={() => setTownPickerOpen(false)}
            >
              {renderPickerOptions(getTownOptions())}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>الشارع</Text>
            <TextInput
              style={styles.textInput}
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholder="ادخل اسم الشارع"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>رقم الهاتف</Text>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="phone-pad"
              placeholder="ادخل رقم الهاتف"
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الرمز الترويجي</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={discountCode}
              onChangeText={(text) => setDiscountCode(text)}
              placeholder="ادخل الرمز الترويجي (إن وجد)"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>إتمام الشراء</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderScreen;