import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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

  // Define delivery charges based on the selected region
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

  // Calculate total price including delivery charges
  const totalPrice = books.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0) + getDeliveryCharge();

  const handlePurchase = () => {
    // Process purchase logic here
    // For example, call an API to complete the order

    // Clear cart after purchase
    dispatch(clearCart());

    // Show success message
    Alert.alert('تمت العملية بنجاح', 'تمت عملية الشراء بنجاح!');

    navigation.goBack(); // Navigate back to previous screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <ScrollView>
        {/* Display book details if books array is defined */}
        {books && books.map((item, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
            <Text>الكمية: {item.quantity}</Text>
            {/* Display more book details as needed */}
          </View>
        ))}

        {/* Region selection using Picker */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>اختر المدينة:</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            style={{ width: 200 }}
          >
            {/* City options will be dynamically populated based on the selected region */}
          </Picker>
        </View>

        {/* Street */}
        <Text>الحي أو الشارع:</Text>
        <TextInput
          placeholder="الحي أو الشارع"
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* Discount code */}
        <Text>أدخل كود الخصم:</Text>
        <TextInput
          placeholder="كود الخصم"
          value={discountCode}
          onChangeText={(text) => setDiscountCode(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* Display delivery charge */}
        <Text>تكلفة التوصيل: {getDeliveryCharge()}</Text>

        {/* Display total price including delivery */}
        <Text>المجموع النهائي: {totalPrice}</Text>

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


