import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Common/Utils/Colors';

const BookItem = ({ title, price, details, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₪{price}</Text>
      {/* Uncomment below line to show book details */}
      {/* <Text style={styles.details}>{details}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.ORANGE,
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default BookItem;
