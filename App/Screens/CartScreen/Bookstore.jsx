import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import BookList from './BookList';
import Cart from './Cart';

const Bookstore = () => {
  const [books, setBooks] = useState([]);
  const [cartData, setCartData] = useState(null); // Assuming cartData is fetched and set here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooksFromApi()
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('****Error fetching books:', error);
        setLoading(false);
      });

    fetchCartDataFromApi()
      .then(data => {
        setCartData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bookstore</Text>
      <View style={styles.content}>
        <BookList books={books} />
        <Cart cartData={cartData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
});

export default Bookstore;
