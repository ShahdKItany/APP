import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';

const YoungAdults = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.title}>الفئة العمرية الشابة</Text>
      <Text style={styles.text}>هذا التصنيف مخصص للكتب الموجهة للفئة العمرية الشابة</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 50,
  },
});

export default YoungAdults;
