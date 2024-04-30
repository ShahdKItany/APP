// CartItems.jsx

import React from "react";
import { View, Text, Button, Image } from "react-native"; // استيراد Image من react-native
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/BookSlice";

const CartItems = ({ route }) => {
  const { title, price, image } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = { title, price, image };
    dispatch(addToCart(newItem));
    alert("تمت إضافة الكتاب إلى عربة التسوق!");
  };

  return (
    <View>
      <Image source={image} style={{ width: 200, height: 300 }} />

      <Text>{title}</Text>
      <Text>{price}</Text>
      <Button title="أضف إلى عربة التسوق" onPress={handleAddToCart} />
    </View>
  );
};

export default CartItems;
