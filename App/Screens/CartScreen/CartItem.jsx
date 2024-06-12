import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../Common/Utils/Colors';

const CartItem = ({ book, details }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: details.mainImage }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{details.title}</Text>
        <Text style={styles.price}>Price: {details.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingVertical: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: Colors.darkGray,
  },
});

export default CartItem;
