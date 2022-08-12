import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, IconButton, TextInput } from 'react-native-paper';
import CameraView from '../../shared/camera/CameraView';
import ImagesList from '../../shared/imagesList/ImagesList';
import { usePickImage } from '../../hooks/usePickImage';
import PublicSection from '../../shared/publicSection/PublicSection';
import CategoriesList from '../../shared/categoriesList.js/CategoriesList';
import { useSaveReport } from '../../hooks/useSaveReport';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';

const AddReportForm = ({ onCancel }) => {
  const { currentLocation } = useCurrentLocation();
  const onSavePhoto = (photo) => {
    if (!capturedPhotos.find((c) => c === photo)) {
      setCapturedPhotos((prev) => [...prev, photo]);
    }
  };

  const { pickImage } = usePickImage({ onSelectImage: onSavePhoto });
  const saveReport = useSaveReport();

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedCategories, setSelectedCategory] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [displayCamera, setDisplayCamera] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const onRemoveImage = (img) => {
    setCapturedPhotos((prev) => prev.filter((c) => c !== img));
  };
  const onSelectCategory = (category) => {
    if (selectedCategories.find((c) => c.id === category.id)) {
      setSelectedCategory(
        selectedCategories.filter((c) => c.id !== category.id)
      );
    } else {
      setSelectedCategory([...selectedCategories, category]);
    }
  };

  const onSubmit = () => {
    saveReport.mutate({
      title: title,
      description,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      categories: selectedCategories.map((c) => c.id),
      images: capturedPhotos,
      isPublic,
    });
    onCancel();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder='Title'
            value={title}
            onChangeText={(txt) => setTitle(txt)}
          />
          <TextInput
            placeholder='description'
            multiline
            style={styles.descriptionStyle}
            value={description}
            onChangeText={(txt) => setDescription(txt)}
          />
        </View>
        <View style={styles.IconContainer}>
          <IconButton
            icon='camera'
            color={'#03A9F4'}
            size={40}
            onPress={() => setDisplayCamera(true)}
            style={{ paddiing: 10 }}
          />

          <IconButton
            icon='image'
            color={'#4CAF50'}
            size={40}
            onPress={pickImage}
            style={{ paddiing: 10 }}
          />
        </View>

        <PublicSection
          onChange={() => setIsPublic(!isPublic)}
          value={isPublic}
        />
        {capturedPhotos.length > 0 && (
          <ImagesList images={capturedPhotos} onRemoveImage={onRemoveImage} />
        )}
        <CategoriesList
          onSelect={onSelectCategory}
          selectedItems={selectedCategories}
        />
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button onPress={onCancel}>Cancel</Button>
        <Button
          disabled={
            selectedCategories.length <= 0 ||
            (capturedPhotos.length <= 0 && description === '')
          }
          onPress={onSubmit}
          mode='contained'
        >
          Spara
        </Button>
      </View>

      {displayCamera && (
        <CameraView
          onTake={onSavePhoto}
          onClose={() => setDisplayCamera(false)}
        />
      )}
    </View>
  );
};

export default AddReportForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: '50%',
  },
  camera: {
    backgroundColor: '#333',
    height: '100%',
  },
  textContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  descriptionStyle: {
    marginTop: 10,
    height: 150,
  },

  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
