import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../ReduxAndAsyncStorage/BookSlice';
import Colors from '../../Common/Utils/Colors';

const CartItem = ({ book }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد أنك تريد إزالة الكتاب من عربة التسوق؟',
      [
        {
          text: 'لا',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => removeFromCartAPI(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const removeFromCartAPI = async (itemId) => {
    try {
      // Your API endpoint to remove item from cart
      const response = await axios.delete(`https://ecommercebackend-jzct.onrender.com/cart/${itemId}`);
      if (response.status === 200) {
        dispatch(removeFromCart(itemId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.bookId}>Book ID: {book.id}</Text> {/* عرض ال Book ID هنا */}
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.price}>₪{book.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(decrementQuantity(book.id))}>
        <Text style={styles.quantityButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{book.quantity}</Text>
      <TouchableOpacity onPress={() => dispatch(incrementQuantity(book.id))}>
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveFromCart(book.id)}>
        <Text style={styles.removeButton}>حذف</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  image: {
    width: 60,
    height: 90,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: Colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    padding: 5,
    color: Colors.primary,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    fontSize: 14,
    color: Colors.red,
  },
  bookId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CartItem;
