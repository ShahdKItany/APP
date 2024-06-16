import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Utils/Colors';

const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    // Navigate to the profile screen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.header}>
      {/* Right side with profile icon */}
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        <Icon name="user" size={40} color={Colors.WHITE} />
      </TouchableOpacity>

      {/* Middle with search input */}
      <View style={styles.middleContainer}>
        <TextInput
          placeholder="ابحث هنا ..."
          placeholderTextColor={Colors.WHITE}
          style={styles.searchInput}
        />
      </View>

      {/* Left side with logo and title */}
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../../../assets/logo/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
    paddingHorizontal: 20,
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  profileContainer: {
    padding: 10,
    borderRadius: 20,
    marginTop: 22,
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: Colors.BLUE,
    color: Colors.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop:35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    width: '90%',
    fontSize: 16,
    textAlign: 'right',
  },
});

export default Header;
