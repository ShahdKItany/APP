import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../../Common/Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Common/Footer/Footer";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/BookSlice";

const Cart = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.books);
  const { totalPrice } = useSelector((state) => state.books);

  const handleCheckout = () => {
    Alert.alert("تم الشراء", "تمت عملية الشراء بنجاح!");
  };

  const Header = ({ title, color }) => (
    <View style={[styles.header, { backgroundColor: color }]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header title="Cart" color="#f93a8f" />

        {books?.map((item, index) => (
          <View key={index} style={styles.bookDetails}>
            <Image source={item.source} style={styles.bookImage} />
            <View style={styles.bookContent}>
              {/* قسم العنوان (العنوان فقط) */}
              <Text style={styles.bookTitle}>{item.title}</Text>

              {/* قسم البقية من المحتوى (الكمية والسعر والأزرار) */}
              <View style={styles.bookInfo}>
                <Text style={styles.bookPrice}>
                  السعر: {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => dispatch(incrementQuantity(item.id))}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.bookQuantity}>
                    الكمية: {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => dispatch(decrementQuantity(item.id))}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Text style={styles.buttonText}>حذف</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>إتمام عملية الشراء</Text>
        </TouchableOpacity>

        {/* مجموع الأسعار */}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>المجموع: {totalPrice}</Text>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  content: {
    flex: 1,
  },
  emptyCart: {
    alignItems: "center",
    textAlign: "center",
    marginTop: "50%",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  bookDetails: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: Colors.GRAY,
  },
  bookInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookQuantity: {
    fontSize: 16,
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#3498db",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: "white",
  },
  totalAmountContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: Colors.ORANGE,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
