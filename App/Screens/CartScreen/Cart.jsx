import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';
import CartItem from './CartItem'; 

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
      console.log('Retrieved token: ', userToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const getBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/books/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return {
        title: response.data.title,
        price: response.data.price,
        mainImage: response.data.mainImage,
      };
    } catch (error) {
      console.error(`Error fetching details for bookId ${bookId}:`, error.message);
      return {}; // يمكنك إرجاع قيمة فارغة أو تحديد قيمة افتراضية للتفاصيل هنا
    }
  };

  const getCartAPI = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`
        }
      });

      console.log('response.data :   ', response.data);
      console.log('message :   ', response.data.message);
      console.log('books : ', response.data.cart.books);
      
      if (response.data.message === 'success') {
        const cartData = response.data.cart.books || [];
        console.log('________CartData   :  ', cartData);
        
        // Fetch details for each book in the cart
        const booksWithDetails = await Promise.all(cartData.map(async (book) => {
          const bookDetails = await getBookDetails(book.bookId);
          console.log('bookID : ', book.bookId);
          return { ...book, ...bookDetails };
        }));
        
        setBooks(booksWithDetails);
        setTotalPrice(response.data.totalPrice || 0);
      } else {
        console.error('Failed to fetch cart data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.delete(`https://ecommercebackend-jzct.onrender.com/cart/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`
        }
      });

      if (response.status === 200) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        // Update total price after removing item
        const totalPriceAfterRemove = totalPrice - books.find(book => book._id === id).price;
        setTotalPrice(totalPriceAfterRemove);
        alert('Item removed from cart successfully!');
      } else {
        console.error('Failed to remove item from cart:', response.status);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await axios.delete('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`
        }
      });

      if (response.status === 200) {
        setBooks([]);
        setTotalPrice(0);
        alert('Cart cleared successfully!');
      } else {
        console.error('Failed to clear cart:', response.status);
      }
    } catch (error) {
      console.error('Error clearing cart:', error.message);
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your Cart is Empty. Add some books to your cart!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {books.map((book) => (
          <CartItem key={book.bookId} book={book} token={token} onRemove={handleRemoveItem} />
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>المجموع (Total): </Text>
          <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <Text style={styles.clearButtonText}>Delete all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('Order')}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
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
    fontSize:   18,
  },
  totalPrice: {
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;