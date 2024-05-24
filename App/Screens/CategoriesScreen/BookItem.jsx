// تحديث BookItem.js

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../../Common/Utils/Colors";

const BookItem = ({ title, price, description, mainImage, onPress }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
        console.error("Error loading image: Timed out after 10 seconds");
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timeoutId);
  }, [loading]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    console.error("تعذر تحميل الصورة");
  };

  return (
    <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
      {loading && <ActivityIndicator size="small" color={Colors.ORANGE} />}
      {error && <Text> تعذر تحميل الصورة </Text>}
      {!loading && !error && mainImage.secure_url ? (
        <Image
          source={{ uri: mainImage.secure_url }}
          style={styles.bookImage}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        !loading && !error && <Text>No Image Available</Text>
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₪{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.PINK,
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    marginTop: 8,
    marginBottom: 2,
    fontWeight: "bold",
    color: Colors.ORANGE,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default BookItem;
