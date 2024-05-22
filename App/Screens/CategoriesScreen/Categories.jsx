// // Categories.js

// import React from 'react';
// import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import Footer from '../../Common/Footer/Footer';
// import Colors from '../../Common/Utils/Colors';

// const Categories = () => {
//   const navigation = useNavigation();

//   const handlePress = (screenName) => {
//     switch (screenName) {
//       case 'From0To2':
//         navigation.navigate('From0To2'); 
//         break;
//       case 'From2To4':
//         navigation.navigate('From2To4');
//         break;
//       case 'From3To6':
//         navigation.navigate('From3To6'); 
//         break;
//       case 'From9To12':
//         navigation.navigate('From9To12'); 
//         break;
//       case 'YoungAdults':
//         navigation.navigate('YoungAdults'); 
//         break;
//       case 'InteractiveBooks':
//         navigation.navigate('InteractiveBooks'); 
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.logoContainer}>
//           <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
//           <Text style={styles.title}>التصنيفات</Text>
//         </View>
//         <View style={styles.content}>
//           <TouchableOpacity style={styles.button1} onPress={() => handlePress('From0To2')}>
//             <Text style={styles.buttonText}>من الولادة  الى 2 سنة</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button2} onPress={() => handlePress('From2To4')}>
//             <Text style={styles.buttonText}>من سن 2 الى 4 سنوات</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button1} onPress={() => handlePress('From3To6')}>
//             <Text style={styles.buttonText}>من سن 3 الى 6 سنوات</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button2} onPress={() => handlePress('From9To12')}>
//             <Text style={styles.buttonText}>من سن 9 الى 12 سنة</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button1} onPress={() => handlePress('YoungAdults')}>
//             <Text style={styles.buttonText}>يافعين</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button2} onPress={() => handlePress('InteractiveBooks')}>
//             <Text style={styles.buttonText}>كتب تفاعلية</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       <Footer />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   button1: {
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginVertical: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0abae4',
//   },
//   button2: {
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginVertical: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FF922B',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 100,
//     resizeMode: 'contain',
//     borderWidth: 1,
//     borderColor: Colors.PINK,
//     marginBottom: 40,
//     marginTop: 50
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 1,
//     marginBottom: 40,
//     color: Colors.BLACK,
//   },
// });

// export default Categories;


import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for making HTTP requests
import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    //axios.get('http://192.168.1.x:3000/category/active')

    axios.get('https://ecommercebackend-jzct.onrender.com/category/active')
      .then(response => {
        setCategories(response.data.categories); // Update state with fetched categories
      console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handlePress = (screenName) => {
    navigation.navigate(screenName); // Navigate to the specified screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
          <Text style={styles.title}>التصنيفات</Text>
        </View>
        <View style={styles.content}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={index % 2 === 0 ? styles.button1 : styles.button2} // Alternating button styles
              onPress={() => handlePress(category.screenName)}
            >
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
