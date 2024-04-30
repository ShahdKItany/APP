import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/wishlistActions';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
const wishlistItems = useSelector((state) => state.wishlistReducer?.wishlistItems ?? []);


const WishlistItems = () => {
  //const wishlistItems = useSelector((state) => state.wishlistReducer.wishlistItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
    // You can display a confirmation message here
    alert('تمت إزالة الكتاب من المفضلة!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>قائمة المفضلة</Text>
      {wishlistItems.map((item, index) => (
        <View key={index} style={styles.bookItem}>
          <Image source={item.image} style={styles.bookImage} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookPrice}>السعر: ₪{item.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromWishlist(item)}
          >
            <Text style={styles.removeButtonText}>إزالة</Text>
          </TouchableOpacity>
         
        </View>
      ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  bookImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookPrice: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WishlistItems;
