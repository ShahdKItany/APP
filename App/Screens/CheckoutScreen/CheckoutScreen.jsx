import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
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
    totalPriceAfterDiscount *= 0.25;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <ScrollView>
     
        {/* Display books with images */}
        {books && books.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <View>
              <Text>{item.title}</Text>
              <Text>الكمية: {item.quantity}</Text>
            </View>
          </View>
        ))}

        {/* Region selection */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Text>اختر المنطقة:</Text>
          <Picker
            selectedValue={region}
            onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
            style={{ width: 200 }}
          >
            <Picker.Item label="القدس" value="Jerusalem" />
            <Picker.Item label="الضفة الغربية" value="The West Bank" />
            <Picker.Item label="الداخل المحتل" value="The occupied interior" />
          </Picker>
        </View>

        {/* City selection */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text>اختر المدينة:</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            style={{ width: 200 }}
          >
            {getCityOptions().map((cityOption, index) => (
              <Picker.Item key={index} label={cityOption} value={cityOption} />
            ))}
          </Picker>
        </View>

        {/* Street input */}
        <Text>الحي أو الشارع:</Text>
        <TextInput
          placeholder="الحي أو الشارع"
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* Discount code input */}
        <Text>أدخل كود الخصم:</Text>
        <TextInput
          placeholder="كود الخصم"
          value={discountCode}
          onChangeText={(text) => setDiscountCode(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* Display prices */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <Text>السعر قبل الخصم:</Text>
          <Text>{totalPriceBeforeDiscount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>السعر بعد الخصم:</Text>
          <Text>{totalPriceAfterDiscount}</Text>
        </View>

        {/* Purchase button */}
        <TouchableOpacity
          style={{ backgroundColor: Colors.ORANGE, padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 }}
          onPress={handlePurchase}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>اتمام الشراء</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;
