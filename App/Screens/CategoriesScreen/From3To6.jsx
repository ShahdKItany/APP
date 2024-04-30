import React from 'react';
import { View, Text } from 'react-native';
import Footer from '../../Common/Footer/Footer';
import Header from '../../Common/Header/Header';

const From3To6 = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 20 }}>من سن 3 إلى 6 سنوات</Text>
      <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 50 }}>هذا التصنيف للأطفال من سن 3 إلى 6 سنوات</Text>
      <Footer />
    </View>
  );
};

export default From3To6;
