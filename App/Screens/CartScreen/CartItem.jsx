import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import axios from 'axios';

const CartItem = ({ book, token, onRemove }) => {
  const { _id, title, price, mainImage, quantity } = book;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const increaseQuantity = async () => {
    try {
      const response = await axios.put(
        `https://ecommercebackend-jzct.onrender.com/cart/increaseQty/${_id}`,
        { quantity: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.data.message === 'success') {
        setItemQuantity(prevQuantity => prevQuantity + 1);
        console.log('Quantity increased successfully');
      } else {
        console.error('Failed to increase quantity:', response.status);
        Alert.alert('Error', 'Failed to increase quantity');
      }
    } catch (error) {
      console.error('Error increasing quantity:', error.message);
      Alert.alert('Error', 'Failed to increase quantity');
    }
  };

  const decreaseQuantity = async () => {
    try {
      const response = await axios.put(
        `https://ecommercebackend-jzct.onrender.com/cart/decreaseQty/${_id}`,
        { quantity: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.data.message === 'success') {
        setItemQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Ensure quantity doesn't go below 1
        console.log('Quantity decreased successfully');
      } else {
        console.error('Failed to decrease quantity:', response.status);
        Alert.alert('Error', 'Failed to decrease quantity');
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error.message);
      Alert.alert('Error', 'Failed to decrease quantity');
    }
  };

  const handleRemove = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await axios.put(
                `https://ecommercebackend-jzct.onrender.com/cart/${_id}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `AmanGRAD__${token}`,
                  },
                }
              );

              console.log('Delete request response:', response); // Log response for debugging

              if (response.data.message === 'success') {
                onRemove(); // Call the parent function to remove the item from state
                Alert.alert('Success', 'Item removed from cart successfully!');
              } else {
                console.error('Failed to remove item from cart:', response.message);
                Alert.alert('Error', 'Failed to remove item from cart');
              }
            } catch (error) {
              console.error('Error removing item from cart:', error.message);
              Alert.alert('Error', 'Failed to remove item from cart');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoBottom}>
          <Text style={styles.price}>₪{price}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
              <MaterialCommunityIcons name="delete" size={27} color="#f93a8f" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={decreaseQuantity}>
              <MaterialCommunityIcons name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{itemQuantity}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={increaseQuantity}>
              <MaterialCommunityIcons name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginRight: 10,
    justifyContent: 'center',
    flex: 1,
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  price: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#D6DBDF',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  quantity: {
    fontSize: 17,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default CartItem;
