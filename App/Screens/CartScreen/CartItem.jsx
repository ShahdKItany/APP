import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({ book, token, onRemove }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('BookDetails', book);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{ uri: book.mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.price}>₪{book.price}</Text>
        <TouchableOpacity onPress={() => onRemove(book._id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    marginTop: 10,
  },
  removeButtonText: {
    color: 'red',
  },
});

export default CartItem;
