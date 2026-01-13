import { View, Button, StyleSheet, Text, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../utils/userContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingPage = () => {
  const { userEmail,userAuthToken } = useContext(UserContext);
  const [result, setResult] = useState('');
  console.log(userEmail);
  const navigator = useNavigation<any>();
  const logout = async () => {
    try {
      const result = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/auth/logout',{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userAuthToken}`,
          },
        },
      );
      const json = await result.json();
      if (json.status == 'success') {
        navigator.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ChangePassword = () => {
    navigator.navigate('ChangePassword');
  };
  const resetPassword = async () => {
    try {
      const result = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/auth/resetpass',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        },
      );
      const json = await result.json();
      if (json.status == 'success') {
        setResult('Reset email send');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>ACCOUNT OPTIONS</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonSecondary} onPress={resetPassword}>
          <Icon name="replay" size={24} color={'#fff'} />
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
        <Pressable style={styles.buttonSecondary} onPress={ChangePassword}>
          <Icon name="key" size={24} color={'#fff'} />
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>
        <Pressable style={styles.buttonLogout} onPress={logout}>
          <Icon name="logout" size={24} color={'#094780'} />
          <Text style={styles.buttonTextLogout}>Logout</Text>
        </Pressable>
        <Text>{result}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  buttonSecondary: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#094780',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonLogout: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#094780',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  buttonTextLogout: {
    color: '#094780',
    fontSize: 16,
  },
  heading: {
    color: '#094780',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
export default SettingPage;
