import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../Utils/Colors';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home'); 
  const navigation = useNavigation(); 

  const tabs = [
    { id: 'New', title: 'جديد', screen: 'New' },
    { id: 'Discount', title: 'خصومات', screen: 'Discount' },
    { id: 'Home', title: 'الكل', screen: 'Home' },
  ];

  const handleTabPress = (tabId, screenName) => {
    setActiveTab(tabId); 
    // Navigate to the corresponding screen based on tabId
    switch (tabId) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'New':
        navigation.navigate('New');
        break;
      case 'Discount':
        navigation.navigate('Discount');
        break;
      default:
        break;
    }
  };

  // Render tab item
  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabItem, item.id === activeTab && styles.activeTab]}
      onPress={() => handleTabPress(item.id, item.screen)}
    >
      <Text style={[styles.tabText, item.id === activeTab && styles.activeTabText]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={renderTabItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.ORANGE,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeTabText: {
    color: '#fff', // Change text color for active tab
  },
});

export default Navbar;
