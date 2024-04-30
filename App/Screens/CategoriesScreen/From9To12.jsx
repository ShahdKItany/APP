import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';

const From9To12 = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.title}>من سن 9 إلى 12 سنة</Text>
      <Text style={styles.text}>هذا التصنيف للأطفال من سن 9 إلى 12 سنة</Text>
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

export default From9To12;
