
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
import { faShoppingCart, faHeart, faStar, faComment } from "@fortawesome/free-solid-svg-icons";
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
  const book = route.params?.book || {};
  const { title, price, finalPrice, description, mainImage, subImages = [], id, reviews } = book;
  const [comment, setComment] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const commentInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (id) {
      checkWishlistStatus();
    }
  }, [id]);

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
        setIsInWishlist(true);
      } else if (response.status === 404) {
        setIsInWishlist(false);
      } else {
        throw new Error(`Failed to check wishlist status. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
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
      if (error.response && error.response.status === 409) {
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
      removeFromWishlist(id);
    } else {
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
        setIsInWishlist(false);
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
      } else {
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {combinedImages.length > 0 && (
            <View style={styles.sliderContainer}>
              <Swiper autoplay height={200}>
                {combinedImages.map((image, index) => (
                  <View style={styles.slide} key={index}>
                    <Image
                      source={{ uri: image }}
                      resizeMode="cover"
                      style={styles.sliderImage}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          )}

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{finalPrice} ج.م</Text>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} size={30} color={Colors.BLACK} />
                <Text style={styles.actionText}>أضف إلى العربة</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAddToFavorites}
              >
                <FontAwesomeIcon icon={faHeart} size={30} color={isInWishlist ? Colors.RED : Colors.BLACK} />
                <Text style={styles.actionText}>{isInWishlist ? 'في المفضلة' : 'أضف إلى المفضلة'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>{description}</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>تقييم الكتاب: </Text>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.starButton}
                  onPress={() => handleStarPress(index)}
                >
                  <StarIcon size={30} color={index < rating ? Colors.YELLOW : Colors.GRAY} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.commentContainer}>
              <TextInput
                ref={commentInputRef}
                style={styles.commentInput}
                placeholder="أضف تعليقًا هنا..."
                value={comment}
                onChangeText={setComment}
                multiline
                onFocus={scrollToCommentInput}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleAddComment}
              >
                <FontAwesomeIcon icon={faComment} size={25} color={Colors.WHITE} />
                <Text style={styles.commentButtonText}>أضف تعليق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.BLACK,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    textAlign: 'right',
  },
  starButton: {
    padding: 5,
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    minHeight: 100,
    textAlign: 'right',
  },
  commentButton: {
    backgroundColor: Colors.BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'right',
  },
});

export default BookDetails;
