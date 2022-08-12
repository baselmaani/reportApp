import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { usePickImage } from '../../hooks/usePickImage';
import ImagesList from '../../shared/imagesList/ImagesList';
import { useSaveComment } from '../../hooks/useSaveComment';

const CommentForm = ({ feedId }) => {
  const saveComment = useSaveComment();

  const [selectedImages, setSelectedImages] = useState([]);
  const onSavePhoto = (photo) => {
    if (!selectedImages.find((c) => c === photo)) {
      setSelectedImages((prev) => [...prev, photo]);
    }
  };

  const { pickImage } = usePickImage({ onSelectImage: onSavePhoto });
  const [comment, setComment] = useState('');

  const onRemoveImage = (photo) => {
    setSelectedImages(selectedImages.filter((c) => c !== photo));
  };

  const onSaveComment = () => {
    saveComment.mutate({
      feedId,
      content: comment,
      images: selectedImages,
    });
    setComment('');
    setSelectedImages([]);
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <IconButton
            onPress={pickImage}
            icon='image'
            color='#3c3c3c'
            size={30}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            value={comment}
            onChangeText={(txt) => setComment(txt)}
            autoCapitalize='none'
            multiline
            style={styles.input}
          />
        </View>
        <View>
          <IconButton
            onPress={onSaveComment}
            icon={'send'}
            color='#3c3c3c'
            size={30}
            disabled={comment === '' && selectedImages.length <= 0}
          />
        </View>
      </View>
      <View>
        {selectedImages.length > 0 && (
          <ImagesList images={selectedImages} onRemoveImage={onRemoveImage} />
        )}
      </View>
    </View>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
    marginTop: 15,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f0f0f050',
    fontSize: 18,
    padding: 2,
  },
});
