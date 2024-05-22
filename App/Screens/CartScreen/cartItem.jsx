// CartItems.jsx
import React from "react";
import { View, Text, Button, Image } from "react-native"; // Import necessary components from react-native
import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { addToCart } from "../../redux/BookSlice"; // Import addToCart action from BookSlice

const CartItems = ({ route }) => {
  // Destructure route.params to extract title, price, and image from the navigation route
  const { title, price, image } = route.params;
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook

  // Function to handle adding the item to the cart
  const handleAddToCart = () => {
    // Create a new item object with title, price, and image
    const newItem = { title, price, image };
    // Dispatch the addToCart action with the newItem object
    dispatch(addToCart(newItem));
    // Show an alert to confirm that the item was added to the cart
    alert("تمت إضافة الكتاب إلى عربة التسوق!");
  };

  return (
    <View>
      {/* Display the image using the Image component */}
      <Image source={{ uri: image }} style={{ width: 200, height: 300 }} />

      {/* Display the title and price using Text components */}
      <Text>{title}</Text>
      <Text>{price}</Text>

      {/* Render a button to add the item to the cart */}
      <Button title="أضف إلى عربة التسوق" onPress={handleAddToCart} />
    </View>
  );
};

export default CartItems;
