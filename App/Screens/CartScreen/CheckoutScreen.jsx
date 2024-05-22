import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Colors from '../../Common/Utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/BookSlice';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
 // const [notes, setNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    books.forEach((item) => {
      total += parseFloat(item.price) * item.quantity;
    });
    setTotalPrice(total);
  };

  // Handle purchase completion
  const handlePurchase = () => {
    // Logic to process purchase
    // For example, you could call an API to complete the order

    // Remove items from cart after purchase
    books.forEach((item) => {
      dispatch(removeFromCart(item.id));
    });

    // Show success message
    Alert.alert('تمت العملية بنجاح', 'تمت عملية الشراء بنجاح!');
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <ScrollView>
        {/* Display book details */}
        {books.map((item, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
            <Text>الكمية: {item.quantity}</Text>
            {/* Display more book details as needed */}
          </View>
        ))}

        {/* Region selection */}
        <Text>اختر المنطقة:</Text>
        <TextInput
          placeholder="المنطقة"
          value={region}
          onChangeText={(text) => setRegion(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* City selection */}
        <Text>اختر المدينة:</Text>
        <TextInput
          placeholder="المدينة"
          value={city}
          onChangeText={(text) => setCity(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

       {/*
        Notes
        <Text>ملاحظات:</Text>
        <TextInput
          placeholder="ملاحظات"
          value={notes}
          onChangeText={(text) => setNotes(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />
      */}

        {/* Discount code */}
        <Text>أدخل كود الخصم:</Text>
        <TextInput
          placeholder="كود الخصم"
          value={discountCode}
          onChangeText={(text) => setDiscountCode(text)}
          style={{ borderWidth: 1, borderColor: Colors.GRAY, padding: 10, marginBottom: 10 }}
        />

        {/* Display calculated price */}
        <Text>السعر قبل الخصم: {totalPrice}</Text>
        {/* Apply discount logic here based on discountCode */}
        {/* Display discounted price */}

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
