import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Colors from '../Utils/Colors';

const Footer = () => {
  const navigation = useNavigation(); // Get navigation object

  const goToHome = () => {
    navigation.navigate('Home'); // Navigate to Home screen
  };

  const goToCart = () => {
    navigation.navigate('Cart'); // Navigate to Cart screen
  };

  const goToCategories = () => {
    navigation.navigate('Categories'); // Navigate to Categories screen
  };

  return (
    <View style={styles.container}>
      {/* Home Icon */}
      <TouchableOpacity onPress={goToHome} style={styles.iconContainer}>
        <Icon name="home" size={35} color={Colors.WHITE} />
      </TouchableOpacity>

      {/* Cart Icon */}
      <TouchableOpacity onPress={goToCart} style={styles.iconContainer}>
        <Icon name="shopping-cart" size={35} color={Colors.WHITE} />
      </TouchableOpacity>

      {/* Categories Icon */}
      <TouchableOpacity onPress={goToCategories} style={styles.iconContainer}>
        <Icon name="list" size={35} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.BLUE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius:70,
    paddingBottom:25,
    marginLeft:20,
    marginRight:5
    
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Footer;   