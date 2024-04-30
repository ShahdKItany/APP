import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../Utils/Colors';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('New'); 
  const navigation = useNavigation(); 

  const tabs = [
    { id: 'New', title: 'جديد', screen: 'New' },
    { id: 'Discount', title: 'خصومات', screen: 'Discount' },
    { id: 'Home', title: 'الكل', screen: 'Home' },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId); 

    const selectedTab = tabs.find((tab) => tab.id === tabId);
    if (selectedTab) {
      navigation.navigate(selectedTab.screen); 
    }
  };

  // Render tab item
  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabItem, item.id === activeTab && styles.activeTab]}
      onPress={() => handleTabPress(item.id)}
    >
      <Text style={styles.tabText}>{item.title}</Text>
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
});

export default Navbar;
