import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../shared/button/CustomButton';
import { useLogin } from '../../hooks/useLogin';

const Login = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const { mutate, isLoading } = useLogin();

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          placeholder='email'
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
            })
          }
          disabled={isLoading}
          title={isLoading ? ' loading ...' : 'Logga in'}
        />

        <View style={styles.btnContainer}>
          <CustomButton
            onPress={() => setCurrentView('signup')}
            disabled={isLoading}
            title='Register'
            style={{ backgroundColor: '#333' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

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
