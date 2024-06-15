import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';
import CartItem from './CartItem';
import Footer from '../../Common/Footer/Footer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Cart = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      getCartAPI();
    }
  }, [token]);

  const fetchTokenFromStorage = async () => {
    try {
      const userToken = await getToken();
      setToken(userToken);
      console.log('Retrieved token:', userToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const getBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('******************response: ', response.data);
      console.log('*****************ID : ', response.data.book._id);
      console.log('image : ', response.data.book.mainImage.secure_url);

      return {
        title: response.data.book.title,
        price: response.data.book.finalPrice,
        mainImage: response.data.book.mainImage.secure_url,
      };
    } catch (error) {
      console.error(`Error fetching details for bookId ${bookId}:`, error.message);
      return {};
    }
  };

  const getCartAPI = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`,
        },
      });

      if (response.data.message === 'success') {
        const cartData = response.data.cart.books || [];

        // Fetch details for each book in the cart
        const booksWithDetails = await Promise.all(cartData.map(async (book) => {
          const bookDetails = await getBookDetails(book.bookId);
          return { ...book, ...bookDetails };
        }));

        setBooks(booksWithDetails);

        // Calculate total price
        const total = booksWithDetails.reduce((sum, book) => sum + book.price * book.quantity, 0);
        setTotalPrice(total);
      } else {
        console.error('Failed to fetch cart data:', response.status);
        Alert.alert('Error', 'Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
      Alert.alert('Error', 'Failed to fetch cart data');
    } finally {
      setLoading(false);
    }
  };


/*
  const handleRemoveItem = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await axios.put(
                `https://ecommercebackend-jzct.onrender.com/cart/${id}`,
                {}, // Empty object as request body
                {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `AmanGRAD__${token}`,
                  },
                }
              );

              if (response.data.message === 'success') {
                // Update state to remove the book from cart
                setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

                // Update total price after removing item
                const removedBook = books.find((book) => book._id === id);
                if (removedBook) {
                  const totalPriceAfterRemove = totalPrice - removedBook.price * removedBook.quantity;
                  setTotalPrice(totalPriceAfterRemove);
                }

                Alert.alert('Success', 'Item removed from cart successfully!');
              } else {
                console.error('Failed to remove item from cart:', response.status);
                Alert.alert('Error', 'Failed to remove item from cart');
              }
            } catch (error) {
              console.error('Error removing item from cart:', error.message);
              Alert.alert('Error', 'Failed to remove item from cart');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
*/

const handleClearCart = async () => {
  try {
    const response = await axios.put('https://ecommercebackend-jzct.onrender.com/cart/', {}, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `AmanGRAD__${token}`,
      },
    });

    if (response.data.message === 'success') {
      setBooks([]);
      setTotalPrice(0);
      Alert.alert('Success', 'Cart cleared successfully!');
    } else {
      console.error('Failed to clear cart:', response.status);
      Alert.alert('Error', 'Failed to clear cart');
    }
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    Alert.alert('Error', 'Failed to clear cart');
  }
};






  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Please log in to view your cart!</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
            <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>
              عربة التسوق
            </Text>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        </View>
        <Footer />
      </>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
            <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>
              عربة التسوق
            </Text>
          </View>
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              العربة فارغة، قم بإضافة الكتب!
            </Text>
          </View>
        </View>
        <Footer />
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
          <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>عربة التسوق</Text>
        </View>
        <View style={styles.separator} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {books.map((book) => (
            <CartItem key={book.bookId} book={book} token={token} onRemove={() => handleRemoveItem(book._id)} />
          ))}

          <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>المجموع :</Text>
          
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonText}>حذف الكل  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('OrderScreen')}>
            <Text style={styles.orderButtonText}> اطلب الان</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust padding as needed
  },
  emptyCartText: {
    fontSize: 20,
    color: 'black', // Set text color to #D6DBDF
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: '#D6DBDF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#f93a8f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 90,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
