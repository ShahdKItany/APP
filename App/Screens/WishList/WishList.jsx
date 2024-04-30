import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlistReducer.wishlistItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>قائمة المفضلة</Text>
      {wishlistItems.map((item, index) => (
        <View key={index} style={styles.bookItem}>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
          {/* يمكنك عرض صورة الكتاب هنا */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default WishList;
