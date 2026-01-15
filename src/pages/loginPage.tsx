import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet, TextInput, Text, Pressable, View } from 'react-native';
import { UserContext } from '../utils/userContext';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ToastAlert from '../utils/toast';

const LoginPage = () => {
  const { setUserEmail } = useContext(UserContext);
  const navigation = useNavigation<any>();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const authenticate = async () => {
    try {
      const response = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/auth',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );
      const json = await response.json();
      console.log(json);
      if (json.status == 'success') {
        setUserEmail(email, json.token);
        console.log(json.token);
        ToastAlert(
          'Success',
          ALERT_TYPE.SUCCESS,
          'Login successful, Redirecting to homepage',
        );
        setTimeout(() => {
          navigation.navigate('Homepage');
        }, 2000);
      } else if (json.status == 'error') {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Login failed!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading}>Welcome back!</Text>
        <Text style={styles.description}>
          Please enter your details to sign in.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Email</Text>
        <View style={styles.inputBox}>
          <Entypo name="mail" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Password</Text>
        <View style={styles.inputBox}>
          <Entypo name="lock" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <Pressable onPress={authenticate} style={styles.button}>
        <Icon name="login" color={'#fff'} size={16} />
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.line} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerContainerText}>
          Don't have an account?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Create one</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    margin: 20,
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
    color: '#094780',
    fontWeight: 'bold',
  },
  description: {
    margin: 10,
    color: '#666',
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: 'flex-start',
    gap: 10,
  },
  inputHeading: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputBox: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#666',
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    color: '#888',
  },
  button: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#094780',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainerText: {
    color: '#000',
  },
  registerButton: {
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 20,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#666',
    width: '100%',
  },
});

export default LoginPage;
