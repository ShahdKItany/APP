import React, { useState, useRef, useEffect } from "react";
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
import { faShoppingCart, faHeart, faStar, faUser, faComment } from "@fortawesome/free-solid-svg-icons";
import Colors from "../../Common/Utils/Colors";
import Footer from "../../Common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectToken } from "../../ReduxAndAsyncStorage/BookSlice";
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BookDetails = ({ route }) => {
  const { title, price, finalPrice, description, mainImage, subImages, id } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState(0);

  const commentInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);

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

  const handleAddToCart = async () => {
    try {
      if (!token) {
        Alert.alert(
          'يرجى تسجيل الدخول لإضافة الكتب إلى عربة التسوق',
          '',
          [{ text: 'موافق', style: 'default' }]
        );
        return;
      }
  
      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/cart/',
        {
          bookId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `AmanGRAD__${token}`
          }
        }
      );
  
      if (response.status === 200) {
        dispatch(addToCart({ title, price: finalPrice, image: mainImage, quantity: 1 }));
        navigation.navigate("Cart");
        Alert.alert("تمت إضافة الكتاب إلى عربة التسوق!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        throw new Error(`فشل في إضافة الكتاب إلى العربة, الرمز الناتج: ${response.status}`);
      }
    } catch (error) {
      if (error.response ) {  //(error.response && error.response.status === 409)
        Alert.alert("الكتاب موجود بالفعل في عربة التسوق!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        Alert.alert("فشل في إضافة الكتاب إلى العربة!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      }
    }
  };
  

  const handleAddToFavorites = () => {
    if (isInWishlist) {
      Alert.alert("الكتاب موجود بالفعل في المفضلة!");
    } else {
      setIsInWishlist(true);
      Alert.alert("تمت إضافة الكتاب إلى المفضلة!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
    }
  };

  const handleAddComment = async () => {
    try {
      // Check if the comment is empty
      if (comment.trim() === "") {
        Alert.alert("يرجى إدخال تعليق قبل إرساله!");
        return;
      }
  
      const response = await axios.post(
        `https://ecommercebackend-jzct.onrender.com/book/${id}/review`,
        {
          comment,
          rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `AmanGRAD__${token}`
          }
        }
      );
  
      if (response.status === 200) {
        // Assuming the API returns the newly created review
        const newReview = response.data;
        // Update comments state with the new review
        setComments([...comments, newReview.comment]);
        // Clear the comment input field
        setComment("");
        // Show success message or handle as needed
        Alert.alert("تمت إضافة التعليق بنجاح!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        throw new Error(`Failed to add comment. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      // Show error message or handle as needed
      Alert.alert("فشل في إضافة التعليق!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
    }
  };
  
  
  

  const handleStarPress = (index) => {
    setRating(index + 1);
    Alert.alert(`تم تقييم الكتاب بـ ${index + 1} نجوم`);
  };

  const scrollToCommentInput = () => {
    if (scrollViewRef.current && commentInputRef.current) {
      commentInputRef.current.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };

  const combinedImages = [mainImage, ...subImages];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          {combinedImages.map((img, index) => (
            <View style={styles.slide} key={index}>
              {img ? (
                <Image source={{ uri: img }} style={styles.image} />
              ) : (
                <Text>الصورة غير متوفرة</Text>
              )}
            </View>
          ))}
        </Swiper>

        <Text style={styles.title}>{title}</Text>

        {price !== undefined && price !== finalPrice && (
          <Text style={styles.originalPrice}>₪{price.toFixed(2)}</Text>
        )}

        <Text style={styles.finalPrice}>السعر: ₪{finalPrice.toFixed(2)}</Text>

        <Text style={styles.details}>{description}</Text>

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
              <Text style={styles.commentText}>{comment}</Text>
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
    paddingHorizontal: 10,
  },
  wrapper: {
    height: 430,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  
  },
  originalPrice: {
    fontSize: 18,
    color:Colors.ORANGE,
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color:Colors.PINK,
  },
  details: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  ratingContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: Colors.PINK,
    padding: 11,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  buttonIcon: {
    marginRight: 10,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize:15
  },
 commentsContainer: {
    marginVertical: 10,
    
  },
  commentsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    
  },
  commentIcon: {
    marginRight: 5,
    color: Colors.BLUE,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLUE,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userIcon: {
    marginRight: 5,
    color: "gray",
  },
  commentText: {
    fontSize: 16,
    color: "gray",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Colors.BLUE,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    minHeight: 50,
  },
  addButton: {
    backgroundColor: Colors.BLUE,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom:100,
  
   
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
   
  },
});

export default BookDetails;