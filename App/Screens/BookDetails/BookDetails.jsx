
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

const StarIcon = ({ size = 30, color = Colors.GRAY }) => (
  <FontAwesomeIcon icon={faStar} size={size} color={color} />
);

const BookDetails = ({ route }) => {
  const { title, price, finalPrice, description, mainImage, subImages, id, reviews } = route.params?.book || {};
  //const [reviews, setReviews] = useState([]);
  const [comment,setComment]=useState('');
  const [isInWishlist, setIsInWishlist] = useState(false); // State to track if book is in wishlist
  const [rating, setRating] = useState(0);
  const commentInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);

  useEffect(() => {
    checkWishlistStatus(); // Check if book is already in the wishlist
   
    console.log(reviews);
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get(
        `https://ecommercebackend-jzct.onrender.com/wishlist/${id}`,
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsInWishlist(true); // Book is already in wishlist
      } else if (response.status === 404) {
        setIsInWishlist(false); // Book is not in wishlist
      } else {
        throw new Error(`Failed to check wishlist status. Status code: ${response.status}`);
      }
    } catch (error) {
      //console.error('Error checking wishlist status:', error);
    }
  };

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
            authorization: `AmanGRAD__${token}`
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

  const handleAddToFavorites = async () => {
    if (!token) {
      Alert.alert(
        'يرجى تسجيل الدخول لإضافة الكتب إلى المفضلة',
        '',
        [{ text: 'موافق', style: 'default' }]
      );
      return;
    }

    if (isInWishlist) {
      // Already in wishlist, perform remove operation
      removeFromWishlist(id);
    } else {
      // Not in wishlist, perform add operation
      addToWishlist(id);
    }
  };

  const addToWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/wishlist/',
        { bookId },
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // قم بتحديث الحالة لتعكس أن الكتاب الآن في قائمة المفضلة
        setIsInWishlist(true);
        Alert.alert('تمت إضافة الكتاب إلى المفضلة بنجاح!');
      } else {
        throw new Error(`فشل في إضافة الكتاب إلى المفضلة. الرمز الناتج: ${response.status}`);
      }
    } catch (error) {
      console.error('خطأ في إضافة الكتاب إلى المفضلة:', error);
      Alert.alert('فشل في إضافة الكتاب إلى المفضلة. الرجاء المحاولة مرة أخرى لاحقًا.');
    }
  };
  
  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.delete(
        `https://ecommercebackend-jzct.onrender.com/wishlist/${bookId}`,
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsInWishlist(false); // Update state to reflect book is no longer in wishlist
        Alert.alert('تمت إزالة الكتاب من المفضلة بنجاح!');
      } else {
        throw new Error(`Failed to remove book from wishlist. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
      Alert.alert('فشل في إزالة الكتاب من المفضلة. الرجاء المحاولة مرة أخرى لاحقًا.');
    }
  };

  
  const handleAddComment = async () => {
    try {
      if (comment.trim() === "") {
        Alert.alert("الرجاء إدخال تعليق قبل الإرسال!");
        return;
      }
  
      console.log('-------------rating',rating);
      console.log('comment',comment);
      const response = await axios.post(

        `https://ecommercebackend-jzct.onrender.com/book/${id}/review`,
        {
          comment,
          rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`,
          }
        }
      );
 
      if (response.status === 201) {
       
        Alert.alert("تمت إضافة التعليق بنجاح!");
      } 
      
      else {
        throw new Error(`فشل في إضافة التعليق.  : ${response.status}`);
      }
    } catch (error) {
      console.error("خطأ في إضافة التعليق:", error);

      Alert.alert("فشل في إضافة التعليق. الرجاء المحاولة مرة أخرى لاحقًا.");
    }
  };
  
  const handleStarPress = (index) => {
    setRating(index + 1);
     Alert.alert(`تم تقييم الكتاب بـ ${index + 1} نجمة/نجوم`);
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


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى عربة التسوق</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}>
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{isInWishlist ? 'إزالة من المفضلة' : 'أضف إلى المفضلة'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsContainer}>
          <View style={styles.commentsTitleContainer}>
            <FontAwesomeIcon icon={faComment} style={styles.commentIcon} />
            <Text style={styles.commentsTitle}>التعليقات</Text>
          </View>

          {/* Render all comments */}
          {reviews.map((review, index) => (
            <>  
            <View key={index} style={styles.commentContainer}>
              <FontAwesomeIcon icon={faUser} style={styles.userIcon} />
              <Text style={styles.commentText}>{review.userId.username}: {review.comment}</Text>

            </View>

      </>
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
    color: Colors.ORANGE,
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: Colors.PINK,
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
    fontSize: 15,
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
    marginBottom: 100,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookDetails;