import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  clearCart,
  selectBooksInCart,
  selectTotalPrice,
  setCart,
  selectToken,
  saveToken,
} from '../../ReduxAndAsyncStorage/BookSlice';
import Colors from '../../Common/Utils/Colors';
import Footer from '../../Common/Footer/Footer';
import CartItem from './CartItem';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart) || [];
  const totalPrice = useSelector(selectTotalPrice) || 0;
  const token = useSelector(selectToken);

  useEffect(() => {
    console.log("Token changed. Fetching cart data...");
    if (token) {
      getCartAPI();
      console.log('toen is : ', token);
    }
  }, [token]);

  const clearCartAPI = async () => {
    try {
      console.log("Clearing cart...");
      const response = await axios.delete('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AmanGRAD__${token}`
        }
      });
      if (response.status === 200) {
        dispatch(clearCart());
      }
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    }
   };

  const getCartAPI = async () => {
    try {
      console.log("Fetching cart data(getCartAPI)...");
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AmanGRAD__${token}`
        }
      });

      if (response.status === 200) {
        dispatch(setCart(response.data));
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert(
          // 'خطأ في المصادقة',
          // 'انتهت صلاحية جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.',
          'Authentication error',
          'The login session has expired. Please log in again.',
          [
            {
              text: '(okay)موافق',
              //okay
              onPress: () => {
                dispatch(saveToken(''));
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const handleClearCart = () => {
    console.log("Prompting confirmation for clearing cart...");
    Alert.alert(
      // 'تأكيد الحذف',
      // 'هل أنت متأكد أنك تريد حذف كل العناصر من عربة التسوق؟',
      'Confirm deletion',
      'Are you sure you want to delete all items from the shopping cart?',
      [
        {
          text: 'لا',
          //no
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          //yes
          onPress: () => clearCartAPI(),
        },
      ],
      { cancelable: false }
    );
  };

  console.log("Rendering Cart component...");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {token ? (
          books.length === 0 ? (
            <Text style={styles.emptyCartText}>عربة التسوق فارغة!                                             
                 Your shopping cart is empty!  </Text>

          ) : (
            <>
              {books.map((book) => (
                <CartItem key={book.id} book={book} token={token} />
              ))}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>المجموع(total): </Text>
                <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
                <Text style={styles.clearButtonText}> Delete all</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <Text style={styles.emptyCartText}>يرجى تسجيل الدخول لعرض عربة التسوق!
          Please log in to view your cart!</Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.GRAY,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 18,
    color: Colors.PINK,
  },
  clearButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  clearButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
