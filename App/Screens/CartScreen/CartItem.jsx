import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../ReduxAndAsyncStorage/BookSlice';
import Colors from '../../Common/Utils/Colors';
import axios from 'axios';

const CartItem = ({ book, token }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد أنك تريد إزالة الكتاب من عربة التسوق؟',
      //'Confirm deletion',
      //'Are you sure you want to remove the book from the shopping cart?',
      [
        {
          text: 'لا',
          //no
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          //yes
          onPress: () => removeFromCartAPI(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const removeFromCartAPI = async (itemId) => {
    try {
      const response = await axios.delete(`https://ecommercebackend-jzct.onrender.com/cart/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AmanGRAD__${token}`
        }
      });
      if (response.status === 200) {
        dispatch(removeFromCart(itemId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        {book.price !== undefined && ( // Check if price is defined
          <Text style={styles.price}>₪{book.price.toFixed(2)}</Text>
        )}
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => dispatch(decrementQuantity(book.id))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{book.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(incrementQuantity(book.id))}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleRemoveFromCart(book.id)}>
        <Text style={styles.removeButton}>delet</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHT_GRAY,
    padding: 10,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: Colors.PINK,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: Colors.PINK,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    fontSize: 16,
    color: Colors.RED,
    marginLeft: 10,
  },
});

export default CartItem;
