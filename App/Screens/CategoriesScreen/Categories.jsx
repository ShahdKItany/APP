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
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('https://ecommercebackend-jzct.onrender.com/category/active')
      .then(response => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  };

  const handlePress = (categoryId, categoryName, categoryImage) => {
    navigation.navigate('BooksByCategory', { categoryId, categoryName, categoryImage });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>التصنيفات</Text>
          <MaterialCommunityIcons name="book-open-variant" size={50} color={Colors.PINK} style={styles.icon} />
        </View>

        <View style={styles.line} /> 
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PINK} />
          </View>
        ) : (
          <View style={styles.content}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryContainer}
                onPress={() => handlePress(category._id, category.name, category.image.secure_url)}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <View style={styles.ovalBorder}>
                    <Image source={{ uri: category.image.secure_url }} style={styles.categoryImage} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:26
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  categoryContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 5,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ovalBorder: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'pink',
    borderStyle: 'dotted',
    marginLeft: 10,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  categoryName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginRight: 10,
  },
 
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.BLUE,
    fontFamily: 'Arial', // Add any font family you prefer
   marginTop:40,
    marginEnd:10,
    alignItems:'center'
  },

  line: {
    borderBottomColor: Colors.ORANGE, // لون الخط
    borderBottomWidth: 2, // سماكة الخط
    width: '50%', // الطول المطلوب للخط
    alignSelf: 'flex-end', // يجعل الخط في وسط الصفحة
    marginBottom: 20, // تباعد بين الخط وباقي العناصر
  },
});

export default Categories;
