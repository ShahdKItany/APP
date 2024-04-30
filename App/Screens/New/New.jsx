import React from 'react'
import { View, Text } from 'react-native';
import Header from '../../Common/Header/Header'; // تعديل المسار إلى الموقع الصحيح للمكون Header
import Navbar from '../../Common/Navbar/Navbar'; // تعديل المسار إلى الموقع الصحيح للمكون Navbar
import Footer from '../../Common/Footer/Footer'; // تعديل المسار إلى الموقع الصحيح للمكون Footer

export default function New() {
  return (
    <View style={{ flex: 1 }}>
    {/* استدعاء مكون Header */}
    <Header />


    {/* استدعاء مكون Navbar */}
    <Navbar />

    <Text> new  </Text>

    {/* استدعاء مكون Footer */}
    <Footer />
  </View>
)
}