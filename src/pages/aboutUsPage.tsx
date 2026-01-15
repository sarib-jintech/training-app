import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ToastAlert from '../utils/toast';

const AboutUsPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(
          'https://bidderapp.auctionmethod.com/amapi/contactus/info',
        );
        const json = await res.json();
        if (json.result == 'success') {
          setAddress(json?.data?.company_address);
          setCity(json?.data?.company_city);
          setState(json?.data?.company_state);
          setPhone(json?.data?.main_phone);
          setEmail(json?.data?.main_email);
        } else {
          ToastAlert('Error', ALERT_TYPE.DANGER, 'Failed to get company info');
        }
      } catch (err) {
        console.log(err);
        ToastAlert('Error', ALERT_TYPE.DANGER, 'Failed to get company info');
      }
    };
    fetchInfo();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>About Us</Text>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <Icon name="location-on" color={'#094780'} size={20} />
          <Text style={styles.subHeading}>OUR LOCATION</Text>
        </View>
        <Text style={styles.infoHeading}>{address}</Text>
        <Text style={styles.infoSubHeading}>
          {city} , {state}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <Icon name="phone" color={'#094780'} size={20} />
          <Text style={styles.subHeading}>PHONE NUMBER</Text>
        </View>
        <Text style={styles.infoHeadingSecondary}>{phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <Icon name="alternate-email" color={'#094780'} size={20} />
          <Text style={styles.subHeading}>EMAIL SUPPORT</Text>
        </View>
        <Text style={styles.infoHeadingSecondary}>{email}</Text>
      </View>
    </View>
  );
};

export default AboutUsPage;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4f24',
  },
  infoContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 10,
    backgroundColor: '#fcf9f8',
    elevation: 6,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  subHeading: {
    color: '#094780',
  },
  infoHeading: {
    fontSize: 20,
    color: '#094780',
    fontWeight: 'bold',
  },
  infoHeadingSecondary: {
    fontSize: 20,
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  infoSubHeading: {
    color: '#999',
  },
});
