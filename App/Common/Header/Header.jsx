import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Utils/Colors';
import Profile from '../../Screens/ProfileScreen/Profile';

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
        <Icon name="user" size={35} color={Colors.WHITE} />
      </TouchableOpacity>

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
    height: 140,
    paddingHorizontal: 20,
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderEndStartRadius: 60,
    borderEndEndRadius: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop:22
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  profileContainer: {
    padding: 10,
    borderRadius: 20,
    marginTop:22

  },
});

export default Header;
