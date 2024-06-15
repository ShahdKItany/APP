import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../ReduxAndAsyncStorage/BookSlice';
import { removeToken } from '../../ReduxAndAsyncStorage/Storage';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        'https://ecommercebackend-jzct.onrender.com/wishlist/',
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.status === 200) {
        setWishlist(response.data);
      } else {
        throw new Error(`Failed to fetch wishlist. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Alert.alert('Failed to fetch wishlist. Please try again later.');
    }
  };

  const addToWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/wishlist/',
        { bookId },
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Book added to wishlist successfully!');
        fetchWishlist(); // Refresh wishlist after adding
      } else {
        throw new Error(`Failed to add book to wishlist. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding book to wishlist:', error);
      Alert.alert('Failed to add book to wishlist. Please try again later.');
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.put(
        `https://ecommercebackend-jzct.onrender.com/wishlist/${bookId}`,
        {},
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Book removed from wishlist successfully!');
        fetchWishlist(); // Refresh wishlist after removal
      } else {
        throw new Error(`Failed to remove book from wishlist. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
      Alert.alert('Failed to remove book from wishlist. Please try again later.');
    }
  };

  const renderWishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  wishlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Wishlist;
