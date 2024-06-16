import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import axios from 'axios';
const CartItem = ({ book, token, onRemove }) => {
  const { _id, title, price, mainImage, quantity } = book;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const increaseQuantity = async (id) => {
    try {
      const response = await axios.post(
        `https://ecommercebackend-jzct.onrender.com/cart/increaseQty/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`,
          },
        }
      );

      console.log('Increase quantity response:', response);

      if (response.data.message === 'success') {
        setItemQuantity(prevQuantity => prevQuantity + 1);
        console.log('Quantity increased successfully');
      } else {
        console.error('Failed to increase quantity:', response.data);
        Alert.alert('Error', 'Failed to increase quantity');
      }
    } catch (error) {
      console.error('Error increasing quantity:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to increase quantity');
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const response = await axios.post(
        `https://ecommercebackend-jzct.onrender.com/cart/decreaseQty/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`,
          },
        }
      );

      console.log('Decrease quantity response:', response);

      if (response.data.message === 'success') {
        setItemQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
        console.log('Quantity decreased successfully');
      } else {
        console.error('Failed to decrease quantity:', response.data);
        Alert.alert('Error', 'Failed to decrease quantity');
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error.response ? error.response.data : error.message);
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
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `AmanGRAD__${token}`,
                  },
                }
              );

              console.log('Delete request response:', response);

              if (response.data.message === 'success') {
                onRemove();
                Alert.alert('Success', 'Item removed from cart successfully!');
              } else {
                console.error('Failed to remove item from cart:', response.status);
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
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(_id)}>
              <MaterialCommunityIcons name="delete" size={27} color="#f93a8f" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => decreaseQuantity(_id)}>
              <MaterialCommunityIcons name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{itemQuantity}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={() => increaseQuantity(_id)}>
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
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    marginRight: 10,
  },
});

export default CartItem;
