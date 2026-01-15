import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ValidateSingle from '../utils/validation';

const ChangePasswordPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const authenticate = async () => {
    if (
      ValidateSingle(id) &&
      ValidateSingle(password) &&
      ValidateSingle(code)
    ) {
      try {
        const response = await fetch(
          'https://bidderapp.auctionmethod.com/amapi/auth/changepass',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              password: password,
              code: code,
            }),
          },
        );
        const json = await response.json();
        if (json.status == 'success') {
          ToastAlert(
            'Success',
            ALERT_TYPE.SUCCESS,
            'Password change successfully',
          );
        } else {
          ToastAlert('Error', ALERT_TYPE.DANGER, 'Password change fail');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAlert('Error', ALERT_TYPE.WARNING, 'Fill all inputs');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Id</Text>
        <View style={styles.inputBox}>
          <Icon name="pin" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            onChangeText={setId}
            value={id}
            placeholder="Id"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Password</Text>
        <View style={styles.inputBox}>
          <Icon name="password" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Code</Text>
        <View style={styles.inputBox}>
          <Icon name="key" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            onChangeText={setCode}
            value={code}
            placeholder="Code"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <Pressable onPress={authenticate} style={styles.button}>
        <Icon name="replay" color={'#fff'} size={16} />
        <Text style={styles.buttonText}>Change password</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    gap: 10,
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
    backgroundColor: '#ff4f24',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChangePasswordPage;
