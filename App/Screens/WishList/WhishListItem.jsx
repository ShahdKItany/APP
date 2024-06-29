import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook here
import Colors from '../../Common/Utils/Colors';

const WishlistItem = ({ book, token, onRemove }) => {
  const { title, price, mainImage, _id } = book;
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  const handleRemove = async () => {
    // Implement removal logic
  };

  const handlePress = () => {
    navigation.navigate('BookDetails', {
      title: book.title,
      price: book.price,
      finalPrice: book.finalPrice,
      description: book.description,
      mainImage: book.mainImage,
      subImages: book.subImages,
      id: book._id,
      reviews: book.reviews,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₪{price}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <MaterialCommunityIcons name="delete" size={27} color="#f93a8f" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
