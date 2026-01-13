import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const ChangePasswordPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [auth, setAuth] = useState('');
  const authenticate = async () => {
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
      setAuth(json.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder="Id send to yuor mail"
        placeholderTextColor={'#666'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="new password"
        placeholderTextColor={'#666'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Code send to your mail"
        placeholderTextColor={'#666'}
      />
      <Button title="Change password" onPress={authenticate} />
      <Text>{auth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default ChangePasswordPage