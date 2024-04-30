import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../../Common/Footer/Footer';
import Header from '../../Common/Header/Header';
import Colors from '../../Common/Utils/Colors';

const From2To4 = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={styles.title}>من سن 2 الى 4 سنوات</Text>
      <Text style={styles.Text}>هذا التصنيف للأطفال من سن 2 إلى 4 سنوات</Text>
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
  Text:{

    textAlign: 'center',
    marginTop:50,
    fontSize:17

  }
});

export default From2To4;
