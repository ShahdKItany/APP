import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

import Colors from "../../Common/Utils/Colors";
import Footer from "../../Common/Footer/Footer";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/BookSlice";

const BookDetails = ({ route, navigation }) => {
  const { id, title, price, details, image } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch = useDispatch();

  const addToCarts = () => {
    const newItem = { id, title, price, image, quantity: 1 };

    dispatch(addToCart(newItem));

    navigation.navigate("Cart");
    Alert.alert("تمت إضافة الكتاب إلى عربة التسوق!");
  };

  const handleAddToCart = () => {
    addToCarts();
  };

  const handleAddToFavorites = () => {
    if (isInWishlist) {
      Alert.alert("الكتاب موجود بالفعل في المفضلة!");
    } else {
      const newItem = { title, price, image };
      setIsInWishlist(true); // تحديث الحالة لتعكس الإضافة إلى المفضلة
      Alert.alert("تمت إضافة الكتاب إلى المفضلة!");
    }
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
      scrollToCommentInput();
    }
  };

  const scrollToCommentInput = () => {
    if (commentInputRef.current && commentInputRef.current.scrollIntoView) {
      commentInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Display Book Image */}
        <Image source={image} style={styles.bookImage} />

        {/* Display Book Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Display Book Price */}
        <Text style={styles.price}>السعر: ₪{price}</Text>

        {/* Display Book Details */}
        <Text style={styles.details}>{details}</Text>

        {/* Add to Cart and Add to Favorites Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى عربة التسوق</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddToFavorites}
          >
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى المفضلة</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>التعليقات</Text>
          {comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              {comment}
            </Text>
          ))}
          <TextInput
            ref={commentInputRef}
            style={styles.commentInput}
            placeholder="أضف تعليقك هنا"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
            <Text style={styles.addButtonText}>أضف تعليق</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: Colors.BLUE,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 12,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 3,
  },
  buttonIcon: {
    color: "white",
    fontSize: 20,
    marginRight: 3,
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.PINK,
    borderRadius: 10,
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    height: 40,
    borderColor: Colors.PINK,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.PINK,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BookDetails;
