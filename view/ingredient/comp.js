import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Color} from '../../src/common';

const categories = ['과일', '채소', '고기', '수산물', '기타'];

export const CategoryUI = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = category => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedButton,
            ]}
            onPress={() => handleCategoryPress(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  scrollContent: {
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.mainLight,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.mainLight,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.mainDeepLight,
  },
  selectedText: {
    color: Color.mainLight,
  },
});
