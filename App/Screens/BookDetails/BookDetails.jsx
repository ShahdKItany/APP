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
  Keyboard,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faHeart, faStar, faUser , faComment } from "@fortawesome/free-solid-svg-icons";

import Colors from "../../Common/Utils/Colors";
import Footer from "../../Common/Footer/Footer";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/BookSlice";

const BookDetails = ({ route, navigation }) => {
  const { id, title, price, details, image } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const addToCarts = () => {
    const newItem = { id, title, price, image, quantity: 1 };

    dispatch(addToCart(newItem));

    navigation.navigate("Cart");
    Alert.alert(
      "تمت إضافة الكتاب إلى عربة التسوق!",
      "",
      [
        {
          text: 'OK',
          style: 'default',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
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
      Alert.alert(
        "تمت إضافة الكتاب إلى المفضلة!",
        "",
        [
          {
            text: 'OK',
            style: 'default',
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
    Alert.alert(`تم تقييم الكتاب بـ ${index + 1} نجوم`);
  };

  const scrollToCommentInput = () => {
    if (scrollViewRef.current && commentInputRef.current) {
      commentInputRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y, animated: true });
        }
      );
    }
  };



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        <Image source={image} style={styles.bookImage} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>السعر: ₪{price}</Text>
        <Text style={styles.details}>{details}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <FontAwesomeIcon
                  icon={faStar}
                  size={30}
                  color={index < rating ? Colors.YELLOW : Colors.GRAY}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى عربة التسوق</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}>
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى المفضلة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsContainer}>
          <View style={styles.commentsTitleContainer}>
            <FontAwesomeIcon icon={faComment} style={styles.commentIcon} />
            <Text style={styles.commentsTitle}>التعليقات</Text>
          </View>

          {comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <FontAwesomeIcon icon={faUser} style={styles.userIcon} />
              <Text style={styles.commentText}>
                {comment}
              </Text>
            </View>
          ))}

          <TextInput
            ref={commentInputRef}
            style={styles.commentInput}
            placeholder="أضف تعليقك هنا"
            value={comment}
            onChangeText={setComment}
            onFocus={scrollToCommentInput}
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
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: Colors.ORANGE,
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
    fontSize: 22,
    marginRight: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    marginTop: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.PINK,
    borderRadius: 20,
    marginBottom: 70,
  },
  commentsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center align the container

    marginBottom: 20,
  },
  commentIcon: {
    marginRight: 10,
    fontSize: 20,
    color: Colors.PINK,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  commentText: {
    fontSize: 18,
    marginBottom: 1,
    textAlign: "right",
    marginBottom: 20,
    flex: 1,
  },
  commentInput: {
    height: 40,
    borderColor: Colors.PINK,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    textAlign: "right",


  },
  commentContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 10,
    marginLeft: 8,
    fontSize: 27,
    padding: 11,
    color: Colors.BLUE,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.PINK,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BookDetails;