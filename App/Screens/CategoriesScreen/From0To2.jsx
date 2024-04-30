import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BookItem from './BookItem'; // استيراد عنصر الكتاب
import Footer from '../../Common/Footer/Footer';
import Header from '../../Common/Header/Header';

const From0To2 = ({ navigation }) => {
  const books = [
    {
      id: '1',
      title: 'اكتشف وتلمس الحيوانات',
      price: 10.99,
      details: 'تفاصيل الكتاب 1',
      image: require('../../../assets/Book Images/34.jpg'),
    },
    {
      id: '2',
      title: 'الرسوم المتحركة',
      price: 12.99,
      details: 'تفاصيل الكتاب 2',
      image: require('../../../assets/Book Images/1.jpeg'),
    },
    // إضافة المزيد من الكتب حسب الحاجة
  ];

  // دالة للانتقال إلى صفحة تفاصيل الكتاب عند النقر على الكتاب
  const handleBookPress = (item) => {
    navigation.navigate('BookDetails', {
      title: item.title,
      price: item.price,
      details: item.details,
      image: item.image,
    });
  };

  return (
    <View style={styles.container}>
        <Header />
      {/* عنصر العنوان */}
      <Text style={styles.title}>    من الولادة  الى 2 سنة     </Text>

      {/* قائمة الكتب */}
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookItem
            title={item.title}
            price={item.price}
            details={item.details}
            image={item.image}
            onPress={() => handleBookPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default From0To2;
