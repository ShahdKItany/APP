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
          {/* Title */}
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="clipboard-outline" size={24} color={Colors.WHITE} style={styles.titleIcon} />
            <Text style={styles.title}>ملخص الطلب</Text>
          </View>

          {/* Display books with images */}
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

          {/* Region selection */}
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

          {/* City selection */}
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

          {/* Town selection */}
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

          {/* Street input */}
          <Text style={styles.label}>الحي أو الشارع:</Text>
          <TextInput
            placeholder="الحي أو الشارع"
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={styles.input}
          />

          {/* Phone number input */}
          <Text style={styles.label}>أدخل رقم الهاتف:</Text>
          <TextInput
            placeholder="رقم الهاتف"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            style={styles.input}
            keyboardType="phone-pad"
          />

          {/* Discount code input */}
          <Text style={styles.label}>أدخل كود الخصم:</Text>
          <TextInput
            placeholder="كود الخصم"
            value={discountCode}
            onChangeText={(text) => setDiscountCode(text)}
            style={styles.input}
          />

          {/* Display prices */}
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

          {/* Total price display */}
          <View style={styles.priceContainer}>
            <Text style={styles.textRight}>المجموع الكلي (شامل التوصيل):</Text>
            <Text style={[styles.totalPriceText, { fontWeight: 'bold' }]}>{totalPriceAfterDiscount} شيكل</Text>
          </View>

          {/* Purchase button */}
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