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
    // Add more book objects as needed
  ];

  // دالة للانتقال إلى BookDetails عند الضغط على صورة الكتاب
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
    // alignItems:'center'
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
