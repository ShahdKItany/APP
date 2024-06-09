import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Common/Utils/Colors';
import { removeToken } from '../../ReduxAndAsyncStorage/Storage';

const menuItems = [
  { id: '1', title: 'تعديل الملف الشخصي', icon: 'edit' },
  { id: '2', title: 'قائمة المفضلة', icon: 'heart' },
  { id: '3', title: 'عربة التسوق', icon: 'shopping-cart' },
  // { id: '4', title: 'الوضع المظلم', icon: 'moon-o' },
  { id: '5', title: 'تواصل معنا', icon: 'phone' },
];

const Profile = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const openLink = (link) => {
    Linking.openURL(link).catch(() => {
      console.error('Failed to open link');
    });
    setShowOptions(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    // يمكنك هنا إضافة المنطق الخاص بتبديل الوضع المظلم في التطبيق
  };

  const openCartPage = () => {
    navigation.navigate('Cart');
    setShowOptions(false);
  };
  const openWishListPage = () => {
    navigation.navigate('WishList');
    setShowOptions(false);
  };
  const openEditProfilePage = () => {
    navigation.navigate('EditProfile');
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>الملف الشخصي</Text>
      </View>

      <View style={styles.content}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === 'تواصل معنا') {
                setShowOptions(true);
              } else if (item.title === 'تعديل الملف الشخصي') {
                 openEditProfilePage();
              } else if (item.title === 'عربة التسوق') {
                openCartPage();
              // } else if (item.title === 'الوضع المظلم') {
              //   toggleDarkMode();
              } else if (item.title === 'قائمة المفضلة') {
                openWishListPage();              }
            }}
          >
            <Icon name={item.icon} size={24} color={Colors.BLACK} style={styles.icon} />
            <Text style={styles.menuText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color={Colors.BLACK} />
          </TouchableOpacity>
        ))}

        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => openLink('https://www.instagram.com/kidskills1/')}>
              <Text style={styles.optionButtonText}>إنستجرام</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => openLink('https://www.facebook.com/profile.php?id=100068874728638')}>
              <Text style={styles.optionButtonText}>فيسبوك</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtonText} onPress={() => setShowOptions(false)}>
            <Text style={styles.cancelButtonText}>إلغاء</Text>
          </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'تسجيل الخروج',
              'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
              [
                {
                  text: 'إلغاء',
                  style: 'cancel',
                },
                {
                  text: 'نعم',
                  onPress: async() => {
                    await removeToken();
                    navigation.navigate('Login');
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >


          <Text style={styles.buttonText}>تسجيل الخروج</Text>

          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: Colors.LIGHT_GRAY,
   backgroundColor:Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor:Colors.PINK,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: Colors.BLACK,
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
  },
  menuText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 18,
    color: Colors.BLACK,
  },
  icon: {
    marginRight: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
    backgroundColor: Colors.PINK,
    paddingVertical: 12,
    paddingHorizontal: 20,

  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: Colors.BLUE,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 110,
    marginBottom: 10,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },

  
  cancelButtonText: {
fontSize:20,
fontWeight: 'bold',

  },
  logoutButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 20, // Adjust the value to your preference
    paddingVertical: 5,
//paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '70%',
    marginTop:40
  }
 
});

export default Profile;
