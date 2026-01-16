import { View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../utils/userContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const SettingPage = () => {
  const { userEmail, userAuthToken, setUserEmail } = useContext(UserContext);
  console.log(userEmail);
  const navigator = useNavigation<any>();
  const logout = async () => {
    try {
      const result = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/auth/logout',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userAuthToken}`,
          },
        },
      );
      const json = await result.json();
      if (json.status == 'success') {
        ToastAlert('Success', ALERT_TYPE.SUCCESS, 'Log out successfully, redirecting to login');
        setUserEmail('','');
        navigator.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
    }
  };
  const DeleteAccount = async () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Are you sure you want to delete your account',
      button: 'Yes, delete',
      closeOnOverlayTap: true,
      onPressButton: async () => {
        try {
          const result = await fetch(
            'https://bidderapp.auctionmethod.com/amapi/auth/account',
            {
              method: 'DELETE',
            },
          );
          const json = await result.json();
          if (json.status == 'success') {
            ToastAlert('Success', ALERT_TYPE.SUCCESS, 'Account deleted');
            navigator.navigate('Login');
          } else {
            ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
          }
        } catch (error) {
          console.log(error);
          ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
        }
      },
    });
  };
  const ChangePassword = () => {
    navigator.navigate('ChangePassword');
  };
  const UpdateInfo = () => {
    navigator.navigate('UpdateInfo');
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
        ToastAlert('Success', ALERT_TYPE.SUCCESS, 'Reset email send');
      } else {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
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
        <Pressable style={styles.buttonSecondary} onPress={UpdateInfo}>
          <Icon name="edit" size={24} color={'#fff'} />
          <Text style={styles.buttonText}>Update Info</Text>
        </Pressable>
        <Pressable style={styles.buttonDelete} onPress={DeleteAccount}>
          <Icon name="delete" size={24} color={'#fff'} />
          <Text style={styles.buttonText}>Delete account</Text>
        </Pressable>
        <Pressable style={styles.buttonLogout} onPress={logout}>
          <Icon name="logout" size={24} color={'#094780'} />
          <Text style={styles.buttonTextLogout}>Logout</Text>
        </Pressable>
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
  buttonDelete: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 5,
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
