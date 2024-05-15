import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectBooksInCart,
  selectTotalPrice,
} from '../../redux/BookSlice';
import Colors from '../../Common/Utils/Colors';
import Footer from '../../Common/Footer/Footer';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart);
  const totalPrice = useSelector(selectTotalPrice);

  const handleCheckout = () => {
    if (books.length === 0) {
      Alert.alert('العربة فارغة', 'الرجاء إضافة كتب إلى عربة التسوق قبل إتمام عملية الشراء.');
    } else {
      navigation.navigate('CheckoutScreen'); 
    }
  };

  const renderCartItem = (item, index) => {
    return (
      <View key={index} style={styles.bookDetails}>
        <Image source={item.source} style={styles.bookImage} />
        <View style={styles.bookContent}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.bookInfo}>
            <Text style={styles.bookPrice}>السعر: {(parseFloat(item.price) * item.quantity).toFixed(2)}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(incrementQuantity(item.id))}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.bookQuantity}>الكمية: {item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(decrementQuantity(item.id))}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(removeFromCart(item.id))}>
                <Text style={styles.buttonText}>حذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={[styles.header, { backgroundColor: '#f93a8f' }]}>
            <Text style={styles.headerText}>عربة التسوق</Text>
          </View>

          {books.length > 0 ? (
            <View>
              {books.map((item, index) => renderCartItem(item, index))}
              <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountText}>المجموع: {totalPrice}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>إتمام عملية الشراء</Text>
              </TouchableOpacity>
              
            </View>
          ) : (
            <Text style={styles.emptyCart}>العربة فارغة</Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bookDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  bookContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookQuantity: {
    fontSize: 16,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.ORANGE,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom:80

  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
