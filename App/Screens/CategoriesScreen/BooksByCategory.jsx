

import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "../../Common/Footer/Footer";
import BookItem from "./BookItem"; // Assuming BookItem component is shared
import Colors from "../../Common/Utils/Colors";
import axios from 'axios';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const BooksByCategory = ({ route }) => {
  const { categoryId, categoryName, categoryImage } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBooksByCategory();
  }, []);

  const fetchBooksByCategory = () => {
    axios.get(`https://ecommercebackend-jzct.onrender.com/category/books/${categoryId}`)
      .then((response) => {
        const { data } = response;
        console.log("Fetched Books:", data.books); // طباعة البيانات المجلوبة
        setBooks(data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books by category:", error);
        setLoading(false);
      });
  };

  const handleBookPress = (book) => {
    const mainImage = book.mainImage.secure_url;
    console.log("Selected Book:", book); // طباعة تفاصيل الكتاب المختار
    navigation.navigate('BookDetails', {
      bookId: book._id,
      title: book.title,
      price: book.price,
      details: book.description, // Assuming details are in description
      mainImage: mainImage,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Categories')}>
          <IconAntDesign name="arrowleft" size={25} color={Colors.ORANGE} />
        </TouchableOpacity>
        <Text style={[styles.categoryName, { color: Colors.PINK }]}>{categoryName}</Text>
        <Image source={{ uri: categoryImage }} style={styles.categoryImage} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PINK} />
      ) : (
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookItem
              title={item.title}
              price={item.finalPrice}
              description={item.description}
              mainImage={item.mainImage.secure_url} // تحديث هنا
              onPress={() => handleBookPress(item)}
            />
          )}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default BooksByCategory;
