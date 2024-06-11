// Cart.jsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
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
  

  /*
  useEffect(() => {
    console.log("Book Details from Database:");
    console.log("Title:", title);
    console.log("Price:", price);
    console.log("Final Price:", finalPrice);
    console.log("Description:", description);
    console.log("Main Image:", mainImage);
    console.log("Sub Images:", subImages);
    console.log("Book ID:", id);
  }, [title, price, finalPrice, description, mainImage, subImages, id]);

  */
  useEffect(() => {
    if (token) {
      getCartAPI();
    }
  }, [token]);

  const clearCartAPI = async () => {
    try {
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
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AmanGRAD__${token}`
        }
      });

      if (response.status === 200) {
       // console.log('Cart data:', response.data); 
        dispatch(setCart(response.data));
  

        const cartData = response.data.cart;
        console.log('________________________cartData : ', cartData);
        const getBookDetails = async (bookId) => {
          try {
            const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/${bookId}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `AmanGRAD__${token}`
              }
            });
        
            if (response.status === 200) {
              const bookDetails = response.data;
              console.log('Title:', bookDetails.title);
              console.log('Price:', bookDetails.price);
              console.log('Main Image:', bookDetails.mainImage);
            } else {
              console.error('Failed to fetch book details');
            }
          } catch (error) {
            console.error('Error fetching book details:', error.message);
          }
        };
        
        if (cartData && cartData.books && cartData.books.length > 0) {
          // Iterate over each book object in the 'books' array
          for (const book of cartData.books) {
            console.log('Book ID:', book.bookId);
            await getBookDetails(book.bookId);
          }
        }
        
        
        
        



        
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert(
          'Authentication error',
          'The login session has expired. Please log in again.',
          [
            {
              text: '(okay)موافق',
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
    Alert.alert(
      'Confirm deletion',
      'Are you sure you want to delete all items from the shopping cart?',
      [
        {
          text: 'لا',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => clearCartAPI(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {token ? (
          books.length === 0 ? (
            <Text style={styles.emptyCartText}>
              عربة التسوق فارغة!
              Your shopping cart is empty!
            </Text>
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
                <Text style={styles.clearButtonText}>Delete all</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <Text style={styles.emptyCartText}>
            يرجى تسجيل الدخول لعرض عربة التسوق!
            Please log in to view your cart!
          </Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    color: Colors.primary,
  },
  clearButton: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Cart;
