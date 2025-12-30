import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const foodData = [
  { name: 'Pizza', image: 'https://c.pxhere.com/photos/29/e3/pizza_baking_fast_food_lunch_business_lunch_restaurant_snacks_food-1372756.jpg!s2' },
  { name: 'Burger', image: 'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Shrimp.jpg' },
  { name: 'Sushi', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Typical_japanese_sushi_set.jpg' },
];

const FoodList = () => {
  return (
    <View style={styles.container}>
      {foodData.map((food, index) => (
        <View key={index} style={styles.foodItem}>
          <Image source={{ uri: food.image }} style={styles.image} />
          <Text style={styles.text}>{food.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  foodItem: {
    flexGrow: 1,
    flexShrink: 1,
    width: '45%',
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
  },
});

export default FoodList;