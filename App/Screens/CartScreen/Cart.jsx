import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectBooksInCart,
  selectTotalPrice,
  setCart,
  selectToken,
  saveToken,
} from '../../ReduxAndAsyncStorage/BookSlice';
import Colors from '../../Common/Utils/Colors';
import Footer from '../../Common/Footer/Footer';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooksInCart) || [];
  const totalPrice = useSelector(selectTotalPrice) || 0;
  const token = useSelector(selectToken);
 
  console.log('3-token in cart : ',token);

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
      } else {
       // console.error('Failed to clear cart');
      }
    } catch (error) {
      //console.error('Error clearing cart:', error.message);
    }
  };

  const removeFromCartAPI = async (itemId) => {
    try {
      const response = await axios.delete(`https://ecommercebackend-jzct.onrender.com/cart/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AmanGRAD__${token}`
        }
      });
      if (response.status === 200) {
        dispatch(removeFromCart(itemId));
      } else {
        //console.error('Failed to remove item from cart');
      }
    } catch (error) {
     // console.error('Error removing item from cart:', error.message);
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
        dispatch(setCart(response.data));
      } else {
        console.error('Failed from cart');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert(
          'خطأ في المصادقة',
          'انتهت صلاحية جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.',
          [
            {
              text: 'موافق',
              onPress: () => {
                dispatch(saveToken(''));
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
       // console.error(error.message);
      }
    }
  };

  const handleRemoveFromCart = (itemId) => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد أنك تريد إزالة الكتاب من عربة التسوق؟',
      [
        {
          text: 'لا',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => removeFromCartAPI(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد أنك تريد حذف كل العناصر من عربة التسوق؟',
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
            <Text style={styles.emptyCartText}>عربة التسوق فارغة!</Text>
          ) : (
            <>
              {books.map((book) => (
                <View style={styles.itemContainer} key={book.id}>
                  <Image source={{ uri: book.image }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.price}>₪{book.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => dispatch(decrementQuantity(book.id))}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{book.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(incrementQuantity(book.id))}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveFromCart(book.id)}>
                    <Text style={styles.removeButton}>حذف</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>المجموع:</Text>
                <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
                <Text style={styles.clearButtonText}>حذف الكل</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <Text style={styles.emptyCartText}>يرجى تسجيل الدخول لعرض عربة التسوق!</Text>
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHT_GRAY,
    padding: 10,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: Colors.PINK,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: Colors.PINK,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    fontSize: 16,
    color: Colors.RED,
    marginLeft: 10,
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