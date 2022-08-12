import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../shared/button/CustomButton';
import { useRegister } from '../../hooks/useRegister';

const Signup = ({ setCurrentView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const { mutate, isLoading } = useRegister();

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={(txt) => setName(txt)}
          placeholder='Name'
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          placeholder='email'
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={tel}
          onChangeText={(txt) => setTel(txt)}
          placeholder='Telephone'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={(txt) => setPassword(txt)}
          placeholder='password'
          secureTextEntry={!showPassword}
          right={
            showPassword === true ? (
              <TextInput.Icon
                onPress={() => setShowPassword(false)}
                name='eye-off'
              />
            ) : (
              <TextInput.Icon
                name='eye'
                onPress={() => setShowPassword(true)}
              />
            )
          }
        />
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          onPress={() =>
            mutate({
              email,
              password,
              tel,
              name,
            })
          }
          disabled={isLoading}
          title={isLoading ? ' loading ...' : 'Sign up'}
        />
      </View>

      <View style={styles.btnContainer}>
        <CustomButton
          onPress={() => setCurrentView('login')}
          disabled={isLoading}
          title='Login'
          style={{ backgroundColor: '#333' }}
        />
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 15,
  },
});
