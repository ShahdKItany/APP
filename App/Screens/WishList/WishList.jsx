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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Import the heart icon
import Colors from '../../Common/Utils/Colors';
import Footer from '../../Common/Footer/Footer';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const WishList = ({ navigation }) => {
  const dispatch = useDispatch();

  const books = useSelector(selectBooksInCart);

  const renderCartItem = (item, index) => {
    const confirmDelete = () => {
      Alert.alert(
        'تأكيد الحذف',
        'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
        [
          {
            text: 'إلغاء',
            style: 'cancel',
          },
          {
            text: 'حذف',
            onPress: () => dispatch(removeFromCart(item.id)),
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <View key={index} style={styles.bookDetails}>
        <Image source={item.source} style={styles.bookImage} />
        <View style={styles.bookContent}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.bookInfo}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.removeButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>حذف</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(incrementQuantity(item.id))}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.bookQuantity}>الكمية: {item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => dispatch(decrementQuantity(item.id))}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.bookPrice}>السعر: {(parseFloat(item.price) * item.quantity).toFixed(2)} ₪</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={[styles.header, { backgroundColor: '#f93a8f' }]}>
            {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Profile')}>
              <IconAntDesign name="arrowleft" size={25} color={Colors.WHITE} style={styles.backIcon} />
            </TouchableOpacity> */}
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIcon} /> 
            <Text style={styles.headerText}> قائمة المفضلة </Text>
          </View>

          {books.length > 0 ? (
            <View>
              {books.map((item, index) => renderCartItem(item, index))}
            </View>
          ) : (
            <Text style={styles.emptyCart}> لم تقم بإضافة شيء بعد</Text>
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
    paddingHorizontal: 20,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.BLUE,
  },
  bookContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 18,
  },
  bookQuantity: {
    fontSize: 17,
    color: '#888',
    textAlign: 'right',
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  quantityButton: {
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 50,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ORANGE,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom    : 80,
  },
  buttonIcon: {
    marginRight: 10,
    color: 'white',
    fontSize: 22,
    padding: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backIcon: {
    marginRight: 140,
  },
});

export default WishList;

