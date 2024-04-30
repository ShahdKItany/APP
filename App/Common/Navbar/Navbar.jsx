import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Colors from '../Utils/Colors';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('New'); // State to track the active tab
  const navigation = useNavigation(); // Get navigation object

  // Define tab data
  const tabs = [
    { id: 'New', title: 'جديد', screen: 'New' },
    { id: 'Discount', title: 'خصومات', screen: 'Discount' },
    { id: 'Home', title: 'الكل', screen: 'Home' },
  ];

  // Function to handle tab press
  const handleTabPress = (tabId) => {
    setActiveTab(tabId); // Set the active tab based on tabId

    // Determine the screen to navigate to based on tabId
    const selectedTab = tabs.find((tab) => tab.id === tabId);
    if (selectedTab) {
      navigation.navigate(selectedTab.screen); // Navigate to the corresponding screen
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
