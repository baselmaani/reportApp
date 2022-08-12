import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import LoadingView from '../../shared/loading/LoadingView';
import { Avatar, Button, TextInput, TouchableRipple } from 'react-native-paper';
import Layout from '../../shared/layout/Layout';
import { usePickImage } from '../../hooks/usePickImage';
import { useSaveProfile } from '../../hooks/useSaveProfile';

const Profile = () => {
  const { data, isLoading } = useProfile();
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [name, setName] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  const [pickedImage, setPickedImage] = useState('');

  const onSavePhoto = (photo) => {
    setPickedImage(photo);
  };

  const { pickImage } = usePickImage({ onSelectImage: onSavePhoto });
  const saveMutation = useSaveProfile();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setTel(data.tel);
    }
  }, [data]);

  const onSaveProfile = () => {
    saveMutation.mutate({
      pickedImage,
      image: originalImage,
      name,
      email,
      tel,
    });
  };
  if (isLoading) return <LoadingView />;

  const points = data.points.reduce((acc, us) => acc + us.value, 0);
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image
              size={100}
              source={
                pickedImage !== null && pickedImage !== ''
                  ? { uri: `data:image/png;base64,${pickedImage}` }
                  : originalImage !== null && originalImage !== ''
                  ? { uri: originalImage }
                  : require('../../../assets/avatar.png')
              }
            />
          </TouchableOpacity>
          <View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsStyle}>{points}</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label={'Namn'}
            placeholder='Namn'
            value={name}
            onChangeText={(txt) => setName(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label={'Email'}
            placeholder='Email'
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='phone'
            label={'telefon'}
            value={tel}
            onChangeText={(txt) => setTel(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button onPress={() => onSaveProfile()} mode='contained'>
            Spara
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  pointsStyle: {
    fontSize: 40,
    color: '#2196F3',
  },
  pointsContainer: {
    marginTop: 10,
  },
});
