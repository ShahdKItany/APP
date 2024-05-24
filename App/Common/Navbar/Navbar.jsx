import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import Colors from '../Utils/Colors';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home'); 
  const navigation = useNavigation(); 
  const route = useRoute();

  const tabs = [
    { id: 'New', title: 'جديد', screen: 'New' },
    { id: 'Discount', title: 'خصومات', screen: 'Discount' },
    { id: 'Home', title: 'الكل', screen: 'Home' },
  ];

  useEffect(() => {
    // Update active tab based on the current screen
    const currentScreen = route.name;
    const tab = tabs.find(tab => tab.screen === currentScreen);
    if (tab) {
      setActiveTab(tab.id);
    }
  }, [route]);

  const handleTabPress = (tabId, screenName) => {
    setActiveTab(tabId); 
    navigation.navigate(screenName);
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
