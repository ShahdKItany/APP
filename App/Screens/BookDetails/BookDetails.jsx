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
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BookDetails = ({ route }) => {
  const { title, price, finalPrice, description, mainImage, subImages } = route.params;
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
    console.log("Title:", title);
    console.log("Original Price:", price);
    console.log("Final Price:", finalPrice);
    console.log("Description:", description);
    console.log("Main Image:", mainImage);
    console.log("Sub Images:", subImages);
  }, [title, price, finalPrice, description, mainImage, subImages]);

  const handleAddToCart = async () => {
    try {
      if (!token) {
        Alert.alert(
          'يرجى تسجيل الدخول لإضافة الكتب إلى عربة التسوق',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }
  
      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/cart/',
        {
          bookId: route.params.bookId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.status !== 200) {
        throw new Error('Failed to add book to cart');
      }
  
      dispatch(addToCart({ title, price: finalPrice, image: mainImage, quantity: 1 }));
  
      navigation.navigate("Cart");
  
      Alert.alert("تمت إضافة الكتاب إلى عربة التسوق!", "", [{ text: 'OK', style: 'default' }], { cancelable: false });
  
    } catch (error) {
      console.error('Error adding book to cart:', error);
      Alert.alert('Failed to add book to cart', '', [{ text: 'OK', style: 'default' }]);
    }
  };
  
  const handleAddToFavorites = () => {
    if (isInWishlist) {
      Alert.alert("الكتاب موجود بالفعل في المفضلة!");
    } else {
      setIsInWishlist(true);
      Alert.alert("تمت إضافة الكتاب إلى المفضلة!", "", [{ text: 'OK', style: 'default' }], { cancelable: false });
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
textAlign: "center",
marginVertical: 10,
},
originalPrice: {
fontSize: 18,
color: Colors.ORANGE,
textAlign: "center",
textDecorationLine: 'line-through',
},
finalPrice: {
fontSize: 18,
color: Colors.PINK,
textAlign: "center",
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
flexDirection: "row",
justifyContent: "center",
width: "100%",
marginTop: 8,
marginBottom: 20,
alignItems: "center",
},
starContainer: {
flexDirection: "row",
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
flexDirection: "row-reverse",
alignItems: "center",
marginBottom: 20,
},
commentsTitle: {
fontSize: 22,
fontWeight: "bold",
marginLeft: 8,
color: Colors.BLUE,
},
commentIcon: {
fontSize: 27,
padding: 11,
color: Colors.BLUE,
alignSelf: "center",
},
commentText: {
fontSize: 20,
flex: 1,
},
commentInput: {
height: 40,
borderColor: Colors.PINK,
borderWidth: 1,
borderRadius: 20,
paddingHorizontal: 10,
marginBottom: 20,
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
alignSelf: "center",
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