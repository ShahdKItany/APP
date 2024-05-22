import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectBooksInCart, clearCart } from '../../redux/BookSlice';
import Colors from '../../Common/Utils/Colors';
import { Picker } from '@react-native-picker/picker';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const handlePurchase = () => {
    if (!region || !city || !street) {
      Alert.alert('خطأ', 'يرجى اختيار المنطقة والمدينة وإدخال الشارع لإكمال الشراء');
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
    Alert.alert('تمت العملية بنجاح', 'تمت عملية الشراء بنجاح!');
    navigation.goBack();
  };

  const getCityOptions = () => {
    switch (region) {
      case 'The West Bank':
        return ['Tulkarm', 'Qalqilya', 'Nablus', 'Jericho', 'Jenin', 'Salfit', 'Ramallah'];
      case 'The occupied interior':
        return ['Jaffa', 'Haifa', 'Lod', 'Acre'];
      case 'Jerusalem':
        return ['Abu Dis', 'Sheikh Jarrah', 'Mount of Olives'];
      default:
        return [];
    }
  };

  const getDeliveryCharge = () => {
    switch (region) {
      case 'The West Bank':
        return 10;
      case 'The occupied interior':
        return 30;
      case 'Jerusalem':
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
      <ScrollView>
        {/* Display books with images */}
        {books && books.map((item, index) => (
          <View key={index} style={styles.bookContainer}>
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <View style={styles.bookDetails}>
              <Text>{item.title}</Text>
              <Text>الكمية: {item.quantity}</Text>
            </View>
          </View>
        ))}

        {/* Region selection */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={region}
            onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="القدس" value="Jerusalem" />
            <Picker.Item label="الضفة الغربية" value="The West Bank" />
            <Picker.Item label="الداخل المحتل" value="The occupied interior" />
          </Picker>
          <Text>اختر المنطقة:</Text>

        </View>

        {/* City selection */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            style={styles.picker}
          >
            {getCityOptions().map((cityOption, index) => (
              <Picker.Item key={index} label={cityOption} value={cityOption} />
            ))}
          </Picker>
          <Text>اختر المدينة:</Text>

        </View>

        {/* Street input */}
        <Text style={styles.label}>الحي أو الشارع:</Text>
        <TextInput
          placeholder="الحي أو الشارع"
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={styles.input}
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
          <Text style={styles.textRight}> المجموع الكلي (شامل التوصيل):</Text>
          <Text style={[styles.totalPriceText, { fontWeight: 'bold' }]}>{totalPriceAfterDiscount} شيكل</Text>
        </View>

        {/* Purchase button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handlePurchase}
        >
          <Text style={styles.buttonText}>ارسال الطلب </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:50
  },
  label: {
    textAlign: 'right',
    
  },
  picker: {
    width: 140,
    height:200
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 1,
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
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:30
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPriceText: {
    //color: Colors.BLUE,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom:10
  },
});

export default CheckoutScreen;
//-----------------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectBooksInCart, clearCart } from '../../redux/BookSlice';
import Colors from '../../Common/Utils/Colors';
import { Picker } from '@react-native-picker/picker';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const handlePurchase = () => {
    if (!region || !city || !street) {
      Alert.alert('خطأ', 'يرجى اختيار المنطقة والمدينة وإدخال الشارع لإكمال الشراء');
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
    Alert.alert('تمت العملية بنجاح', 'تمت عملية الشراء بنجاح!');
    navigation.goBack();
  };

  const getCityOptions = () => {
    switch (region) {
      case 'The West Bank':
        return ['Tulkarm', 'Qalqilya', 'Nablus', 'Jericho', 'Jenin', 'Salfit', 'Ramallah'];
      case 'The occupied interior':
        return ['Jaffa', 'Haifa', 'Lod', 'Acre'];
      case 'Jerusalem':
        return ['Abu Dis', 'Sheikh Jarrah', 'Mount of Olives'];
      default:
        return [];
    }
  };

  const getDeliveryCharge = () => {
    switch (region) {
      case 'The West Bank':
        return 10;
      case 'The occupied interior':
        return 30;
      case 'Jerusalem':
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
      <ScrollView>
        {/* Display books with images */}
        {books &&
          books.map((item, index) => (
            <View key={index} style={styles.bookContainer}>
              <View style={styles.bookInfo}>
                <Image source={{ uri: item.image }} style={styles.bookImage} />
                <View>
                  <Text>{item.title}</Text>
                  <Text>الكمية: {item.quantity}</Text>
                </View>
              </View>
              {/* Place the picker for region and city here */}
              {(index === 0 || index === books.length - 1) && (
                <View style={styles.locationContainer}>
                  {/* Region selection */}
                  <View style={styles.locationRow}>
                    <Text style={styles.label}>اختر المنطقة:</Text>
                    <Picker
                      selectedValue={region}
                      onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="القدس" value="Jerusalem" />
                      <Picker.Item label="الضفة الغربية" value="The West Bank" />
                      <Picker.Item label="الداخل المحتل" value="The occupied interior" />
                    </Picker>
                  </View>
                  {/* City selection */}
                  <View style={styles.locationRow}>
                    <Text style={styles.label}>اختر المدينة:</Text>
                    <Picker
                      selectedValue={city}
                      onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
                      style={styles.picker}
                    >
                      {getCityOptions().map((cityOption, index) => (
                        <Picker.Item key={index} label={cityOption} value={cityOption} />
                      ))}
                    </Picker>
                  </View>
                </View>
              )}
            </View>
          ))}
        {/* Street input */}
        <Text style={styles.label}>الحي أو الشارع:</Text>
        <TextInput
          placeholder="الحي أو الشارع"
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={styles.input}
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
          <Text>التوصيل:</Text>
          <Text>{deliveryCharge} شيكل</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text>السعر قبل الخصم:</Text>
          <Text>{totalPriceBeforeDiscount} شيكل</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text>السعر بعد الخصم:</Text>
          <Text>{totalPriceAfterDiscount} شيكل</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>السعر الكلي (شامل التوصيل):</Text>
          <Text style={styles.totalPrice}>{totalPriceAfterDiscount} شيكل</Text>
        </View>

        {/* Purchase button */}
        <TouchableOpacity style={styles.button} onPress={handlePurchase}>
          <Text style={styles.buttonText}>اتمام الشراء</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    //marginLeft:10,
    //marginRight:20
  },
  /*
  scrollView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  */
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: 20,
  },
  label: {
    textAlign: 'right',
  },
  picker: {
    width: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 10,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    marginTop: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    textAlign: 'right',
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
