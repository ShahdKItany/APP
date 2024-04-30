import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from './customComponents/Header';
import Icon from 'react-native-vector-icons/AntDesign'; 
import Footer from '../../Common/Footer/Footer';

const CategoriesScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.header} onPress={()=>navigation.navigate('Home')}>
          <Icon  name="arrowleft" size={25} color="black" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        </View>

      
        <Header  Title="التصنيفات" color='#f93a8f' />

        <View style={styles.content}>
          <TouchableOpacity style={styles.button1}>
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
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    paddingRight: 16,
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
    borderColor: '#f93a8f'
  },
});

export default CategoriesScreen;
