import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useCategories } from './../../hooks/useCategories';

const CategoryItem = ({ name, image, onSelect, selected }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.itemStyle}>
      <Image
        source={{ uri: image }}
        style={selected ? styles.selectedImage : styles.imageStyle}
      />
      <Text style={selected ? styles.selectedName : styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};
const CategoriesList = ({ categories, onSelect, selectedItems }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>kategori</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.listStyle}
        data={categories}
        keyExtractor={({ item }) => item}
        horizontal={true}
        renderItem={({ item }) => (
          <CategoryItem
            name={item?.name}
            image={item?.image}
            selected={selectedItems?.find((c) => c?.id === item?.id)}
            onSelect={() => onSelect(item)}
          />
        )}
      />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  imageStyle: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  label: {
    margin: 10,
    marginRight: 20,
  },
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  name: {
    fontSize: 12,
    marginTop: 5,
    color: '#3c3c3c70',
  },
  selectedName: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },
});
