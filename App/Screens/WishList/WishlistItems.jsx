import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToWishlist } from './WishlistActions';

const WishlistItems = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(book));
  };

  return (
    <TouchableOpacity style={styles.bookContainer}>
      <Image source={book.image} style={styles.bookImage} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.price}>₪{book.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToWishlist}>
        <Text style={styles.buttonText}>Add to Wishlist</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WishlistItems;
