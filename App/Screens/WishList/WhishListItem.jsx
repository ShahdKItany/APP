import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import axios from 'axios';
import Colors from '../../Common/Utils/Colors';

const WishlistItem = ({ book, token, onRemove }) => {
  const { _id, title, price, mainImage } = book;

  const handleRemove = async () => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this item from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: async () => {
            try {
              const response = await axios.delete(
                `https://ecommercebackend-jzct.onrender.com/wishlist/${_id}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `AmanGRAD__${token}`,
                  },
                }
              );

              console.log('Remove from wishlist response:', response);

              if (response.data.message === 'success') {
                onRemove();
                Alert.alert('Success', 'Item removed from wishlist successfully!');
              } else {
                console.error('Failed to remove item from wishlist:', response.status);
                Alert.alert('Error', 'Failed to remove item from wishlist');
              }
            } catch (error) {
              console.error('Error removing item from wishlist:', error.message);
              Alert.alert('Error', 'Failed to remove item from wishlist');
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
        <Text style={styles.price}>₪{price}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <MaterialCommunityIcons name="delete" size={27} color="#f93a8f" />
        </TouchableOpacity>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default WishlistItem;
