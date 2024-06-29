import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import Colors from '../Utils/Colors';
import Footer from '../Footer/Footer';
import Header from './Header';
import Navbar from '../Navbar/Navbar';

const BookSearchScreen = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState(route.params?.searchTerm || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Alert.alert('الرجاء إدخال اسم كتاب للبحث عنه');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/Active?title=${encodeURIComponent(searchTerm.trim())}`);
      const data = response.data;

      console.log('Search results:', data);

      if (data.books.length === 0) {
        Alert.alert('عذراً', `الكتاب "${searchTerm.trim()}" غير متوفر في الوقت الحالي`);
      }

      setSearchResults(data.books);
    } catch (error) {
      console.error('Error searching books:', error);
      Alert.alert('حدث خطأ أثناء البحث عن الكتاب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (item) => {
    if (item) {
      const { _id, title, price, description, mainImage, subImages, Discount, reviews } = item;
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
        reviews,
      });
    } else {
      Alert.alert('خطأ', 'لا يمكن الوصول إلى تفاصيل الكتاب الآن. يرجى المحاولة مرة أخرى.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleBookPress(item)}>
      <Image source={{ uri: item.mainImage.secure_url }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.finalPrice} ₪</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredResults = searchResults.filter(item => item.title.includes(searchTerm.trim()));

  return (
    <>  
      <Header />
      <Navbar />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder=" اكتب اسم الكتاب  ..."
          placeholderTextColor={Colors.BLACK}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          value={searchTerm}
        />
        {loading ? (
          <Text style={styles.loadingText}>جاري البحث...</Text>
        ) : (
          <FlatList
            data={filteredResults.length > 0 ? filteredResults : searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            style={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>لا توجد نتائج للعرض</Text>}
          />
        )}
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.ORANGE,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'right', // لجعل النص يتجه إلى اليمين
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PINK,
  },
  bookImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'right', // لجعل النص يتجه إلى اليمين
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 120,
    color: Colors.PINK,
  },
});

export default BookSearchScreen;
