import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // استيراد useNavigation من react-navigation

import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';

const Categories = () => {
  const navigation = useNavigation(); // استخدام useNavigation للحصول على الكائن الخاص بالتنقل

  const handlePress = (category) => {
    // تحديد التوجيه بناءً على الفئة المحددة
    if (category === 'من الولادة  الى 2 سنة') {
      navigation.navigate('From0To2'); // توجيه المستخدم إلى صفحة From0To2 عند النقر على الزر
    }
    // يمكنك إضافة المزيد من الشروط هنا للتوجيه إلى صفحات أخرى
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('من الولادة  الى 2 سنة')}>
            <Text style={styles.buttonText}>من الولادة  الى 2 سنة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>من سن 2 الى 4 سنوات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>من سن 3 الى 6 سنوات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>من سن 9 الى 12 سنة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>يافعين</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>كتب تفاعلية</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button1: {
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0abae4',
  },
  button2: {
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF922B',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor:Colors.PINK,
    marginBottom: 40,
    marginTop: 30
  },
});

export default Categories;
