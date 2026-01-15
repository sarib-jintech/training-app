import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
} from 'react-native';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE } from 'react-native-alert-notification';

const ResendEmailPage = () => {
  const [email, onChangeEmail] = useState('');
  const resendActivation = async () => {
    try {
      const response = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/register/resendactivation',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const json = await response.json();
      if(json.status=='success'){
        ToastAlert('Success',ALERT_TYPE.SUCCESS,'Email send successfully');
      }else{
        ToastAlert('Error',ALERT_TYPE.WARNING,'Fail to process your request');
      }
    } catch (error) {
      ToastAlert('Error',ALERT_TYPE.WARNING,'Something went wrong');
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Enter email</Text>
        <TextInput
          style={styles.input}
          placeholder="xyz@gmail.com"
          placeholderTextColor={'#666'}
          onChangeText={onChangeEmail}
        />
      <Pressable style={styles.button} onPress={resendActivation} >
        <Text style={styles.buttonText}>
            Resend
        </Text>
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
  inputContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      gap: 10,
    },
    inputHeading: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
      height: 45,
      width: '100%',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
      color: '#000',
    },
    button: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#ff4f24',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResendEmailPage;
