import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../utils/userContext';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ValidateSingle from '../utils/validation';

const ContactUsPage = () => {
  const { userEmail } = useContext(UserContext);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const handleSend = async () => {
    if (ValidateSingle(name) && ValidateSingle(message)) {
      try {
        const response = await fetch(
          'https://bidderapp.auctionmethod.com/amapi/contactus',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: name,
              from_email: userEmail,
              company: company,
              phone: phone,
              subject: subject,
              body: message,
            }),
          },
        );
        const json = await response.json();
        if (json.status == 'success') {
          ToastAlert(
            'Success',
            ALERT_TYPE.SUCCESS,
            'Form submitted successfully',
          );
        } else {
          ToastAlert('Error', ALERT_TYPE.WARNING, 'Fail to submit form');
        }
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAlert('Error', ALERT_TYPE.WARNING, 'Message and Name are required');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.description}>
        Have questions about an aution or account? Fill out the form below and
        we'll help you out.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Name</Text>
        <View style={styles.inputBox}>
          <Icon name="person" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            multiline={false}
            onChangeText={setName}
            value={name}
            placeholder="Enter your full name"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Subject (optional)</Text>
        <View style={styles.inputBox}>
          <Icon name="topic" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            multiline={false}
            onChangeText={setSubject}
            value={subject}
            placeholder="Enter subject"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Phone (optional)</Text>
        <View style={styles.inputBox}>
          <Icon name="phone" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            multiline={false}
            onChangeText={setPhone}
            value={phone}
            placeholder="Enter phone no"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Company (optional)</Text>
        <View style={styles.inputBox}>
          <Icon name="apartment" size={24} color={'#888'} />
          <TextInput
            style={styles.input}
            multiline={false}
            onChangeText={setCompany}
            value={company}
            placeholder="Enter subject"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <View style={styles.inputAreaContainer}>
        <Text style={styles.inputHeading}>Message</Text>
        <View style={styles.inputAreaBox}>
          <TextInput
            style={styles.inputArea}
            multiline={true}
            onChangeText={setMessage}
            value={message}
            placeholder="Enter message"
            placeholderTextColor={'#666'}
          />
        </View>
      </View>
      <Pressable onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Send message</Text>
        <Icon name="send" color={'#fff'} size={16} />
      </Pressable>
    </View>
  );
};

export default ContactUsPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'flex-start',
    gap: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff4f24',
  },
  description: {
    color: '#999',
    fontSize: 16,
  },
  inputContainer: {
    justifyContent: 'flex-start',
    gap: 10,
    marginRight: 20,
  },
  inputAreaContainer: {
    justifyContent: 'flex-start',
    gap: 10,
  },
  inputHeading: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputBox: {
    flexDirection: 'row',
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
  inputArea: {
    height: 120,
    width: '100%',
    paddingHorizontal: 10,
    color: '#888',
    textAlignVertical: 'top',
  },
  inputAreaBox: {
    flexDirection: 'row',
    borderColor: '#666',
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
    borderRadius: 5,
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
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    textAlign: 'center',
    color: 'green',
  },
});
