



/*
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import Navbar from "../../Common/Navbar/Navbar";
import Colors from "../../Common/Utils/Colors";

const BookItem = ({ image, title, price, details, onPress }) => {
  return (
    <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
      <Image source={image} style={styles.bookImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}> ₪{price}</Text>
      <Text style={styles.details}>{details}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();

  const books = [
    {
      id: "1",
      title: "  بعيداً عن العالم",
      price: 30 ,
      details: "Details of Book 1",
      image: require("../../../assets/Book Images/34.jpg"),
    },
    {
      id: "2",
      title: "أول 100 كلمة",
      price: 120,
      details:
        "يعد هذا الكتاب رفيقًا مثاليًا لتعليم الأطفال فوائد الصيام وأهمية شهر رمضان المبارك بطريقة ممتعة وتفاعلية. يعيش الطفل تجربة رمضان مع الشخصيات الرائعة أحمد وزهراء من خلال الصور الجميلة والأنشطة ",
      image: require("../../../assets/Book Images/1.jpeg"),
    },
    {
      id: "3",
      title: "القطة ",
      price: 90,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/40.jpg"),
    },
    
  
    {
      id: "6",
      title: "أبيض فقط!",
      price: 40,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/4.jpeg"),
    },
    {
      id: "7",
      title: "الروائح والألوان",
      price: 70,
      details: "Details of Book 1",
      image: require("../../../assets/Book Images/16.jpg"),
    },
    {
      id: "4",
      title: "الرؤية, الإحساس, الألوان",
      price: 110,
      details: "Details of Book 1",
      image: require("../../../assets/Book Images/38.jpg"),
    },
    {
      id: "8",
      title: "Book 2",
      price: 120,
      details: "Details of Book 2",
      image: require("../../../assets/Book Images/12.jpeg"),
    },
    {
      id: "9",
      title: "Book 4",
      price: 90,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/39.jpg"),
    },
    {
      id: "10",
      title: "Book 1",
      price: 115,
      details: "Details of Book 1",
      image: require("../../../assets/Book Images/35.jpg"),
    },
    {
      id: "11",
      title: "Book 2",
      price: 120,
      details: "Details of Book 2",
      image: require("../../../assets/Book Images/37.jpg"),
    },
    {
      id: "5",
      title: "وقت النوم ",
      price: 125,
      details: "Details of Book 2",
      image: require("../../../assets/Book Images/1.jpeg"),
    },
    {
      id: "12",
      title: "Book 5",
      price: 95,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/27.jpg"),
    },
    {
      id: "13",
      title: "Book 6",
      price: 70,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/18.jpg"),
    },
    {
      id: "14",
      title: "أُلون..أقص..أُلصق ",
      price: 50,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/20.jpg"),
    },
    {
      id: "15",
      title: "قصص الأنبياء ",
      price: 35,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/21.jpg"),
    },
    {
      id: "16",
      title: "اكتشف وتلمس الحيوانات",
      price: 90,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/22.jpg"),
    },
    {
      id: "17",
      title: "اكتشف وتلمس الحيوانات",
      price: 60,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/23.jpg"),
    },
    {
      id: "18",
      title: "Book 3",
      price: 80,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/28.jpg"),
    },
    {
      id: "19",
      title: "Book 3",
      price: 45,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/29.jpg"),
    },
    {
      id: "20",
      title: "Book 3",
      price: 50,
      details: "Details of Book 3",
      image: require("../../../assets/Book Images/30.jpg"),
    },
  ];

  const handleBookPress = (item) => {
    navigation.navigate("BookDetails", {
      id: item.id,
      title: item.title,
      price: item.price,
      details: item.details,
      image: item.image,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header showBackButton={true} />
      <Navbar />

      <View style={{ flex: 1, paddingHorizontal: 10, marginBottom:50 }}>
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookItem
              title={item.title}
              price={item.price}
              //details={item.details}
              image={item.image}
              key={item.id}
              onPress={() => handleBookPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2} // عدد الأعمدة في العرض
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 2,
    fontWeight: "bold",
  },
  details: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default Home;

*/










// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Navbar from '../../Common/Navbar/Navbar';
import Colors from '../../Common/Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Home = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    console.log('Fetching books...');
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/book/Active');
      console.log('Books fetched:', response.data);
      setBooks(response.data.books);
      setIsLoading(false); // Set loading status to false when books are fetched
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsLoading(false); // Set loading status to false in case of error
      // Handle error here, such as displaying an error message to the user
    }
  };

  const handleBookPress = (item) => {
    console.log('Book pressed:', item);
    const { _id, title, price, description, mainImage, subImages, Discount } = item;
    const mainImageUrl = mainImage?.secure_url || null;
    const subImagesUrls = subImages.map((image) => image.secure_url);
    const finalPrice = price * ((100 - Discount) / 100); // Corrected final price calculation

    navigation.navigate('BookDetails', {
      id: _id,
      title,
      description,
      mainImage: mainImageUrl,
      subImages: subImagesUrls,
      Discount,
      price,
      finalPrice,
    });
  };

  const isNewBook = (book) => {
    const today = new Date();
    const bookDate = new Date(book.createdAt);
    const sixtyDaysAgo = new Date(today.setDate(today.getDate() - 14));
    return bookDate >= sixtyDaysAgo;
  };

  const isDiscountedBook = (book) => {
    return book.Discount !== undefined && book.Discount > 0;
  };

  const calculateDiscountPercentage = (book) => {
    if (isDiscountedBook(book)) {
      return book.Discount;
    } else {
      return 0; // No discount, so return 0 percentage
    }
  };

  const renderBookItem = ({ item }) => {
    const isNew = isNewBook(item);
    const isDiscounted = isDiscountedBook(item);
    const discountPercentage = calculateDiscountPercentage(item);
    const finalPrice = item.price * ((100 - item.Discount) / 100); // Ensure valid calculation

    // Log the price and final price
    console.log('Discount =', item.Discount);
    console.log('Price:', item.price);
    console.log('Final Price:', finalPrice);
    console.log('___________________________________________');

    if (isDiscounted) {
      console.log(`${item.title} is discounted by ${discountPercentage}% (${item.price - finalPrice}₪)`);
    } else {
      console.log(`${item.title} has no discount`);
    }

    return (
      <TouchableOpacity style={styles.bookContainer} onPress={() => handleBookPress(item)}>
        {item.mainImage?.secure_url ? (
          <View>
            <Image source={{ uri: item.mainImage.secure_url }} style={styles.bookImage} />
            {isDiscounted && (
              <View style={styles.discountLabel}>
                <Icon name="fire" size={19} color="white" />
                <Text style={styles.discountText}> {discountPercentage}%</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.bookImagePlaceholderContainer}>
            <View style={styles.bookImagePlaceholder}>
              <Text style={styles.placeholderText}>Image not available</Text>
            </View>
          </View>
        )}
        {isNew && <Text style={styles.newLabel}>جديد</Text>}
        <Text style={styles.title}>{item.title}</Text>
        {isDiscounted ? (
          <View style={styles.discountContainer}>
            <Text style={styles.discountedPrice}>₪{item.price}</Text>
            <Text style={styles.originalPrice}>₪{finalPrice.toFixed(2)}</Text>
          </View>
        ) : (
          <View style={styles.discountContainer}>
            <Text style={styles.price}>₪{item.price}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Navbar />
      <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 50 }}>
        {isLoading ? ( // Show activity indicator if loading
          <ActivityIndicator size="large" color={Colors.ORANGE} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  discountLabel: {
    position: 'absolute',
    top: -5,
    right: -7,
    padding: 3,
    borderRadius: 10,
    backgroundColor: Colors.PINK,
    flexDirection: 'column',
    alignItems: 'center',
    //transform: [{ rotate: '22deg' }], // Add rotation to make it slanted
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 3, // Add some margin between icon and text
  },
  bookImagePlaceholderContainer: {
    width: 120,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 10,
  },
  bookImagePlaceholder: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  placeholderText: {
    color: 'gray',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  newLabel: {
    position: 'absolute',
    top: 3,
    left: 5,
    padding: 3,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#0BDA51',
  },
  discountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  discountedPrice: {
    fontSize: 15,
    color: Colors.ORANGE,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  originalPrice: {
    fontSize: 15,
    color: Colors.PINK,
    fontWeight: 'bold',
  },
});

export default Home;