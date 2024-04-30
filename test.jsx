import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';

const Categories = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    // تحديد التوجيه بناءً على اسم الصفحة
    switch (screenName) {
      case 'From0To2':
        navigation.navigate('0_2'); // توجيه المستخدم إلى صفحة '0_2' عند النقر على الزر
        break;
      case 'From2To4':
        navigation.navigate('2_4'); // توجيه المستخدم إلى صفحة '2_4' عند النقر على الزر
        break;
      case 'From3To6':
        navigation.navigate('3_6'); // توجيه المستخدم إلى صفحة '3_6' عند النقر على الزر
        break;
      case 'From9To12':
        navigation.navigate('9_12'); // توجيه المستخدم إلى صفحة '9_12' عند النقر على الزر
        break;
      case 'YoungAdults':
        navigation.navigate('YoungAdults'); // توجيه المستخدم إلى صفحة 'YoungAdults' عند النقر على الزر
        break;
      case 'InteractiveBooks':
        navigation.navigate('InteractiveBooks'); // توجيه المستخدم إلى صفحة 'InteractiveBooks' عند النقر على الزر
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
          <Text style={styles.title}>التصنيفات</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('From0To2')}>
            <Text style={styles.buttonText}>من الولادة  الى 2 سنة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => handlePress('From2To4')}>
            <Text style={styles.buttonText}>من سن 2 الى 4 سنوات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('From3To6')}>
            <Text style={styles.buttonText}>من سن 3 الى 6 سنوات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => handlePress('From9To12')}>
            <Text style={styles.buttonText}>من سن 9 الى 12 سنة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => handlePress('YoungAdults')}>
            <Text style={styles.buttonText}>يافعين</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => handlePress('InteractiveBooks')}>
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
    borderColor: Colors.PINK,
    marginBottom: 40,
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 40,
    color: Colors.BLACK,
  },
});

export default Categories;
