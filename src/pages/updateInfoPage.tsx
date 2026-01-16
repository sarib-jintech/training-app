import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../utils/userContext';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE } from 'react-native-alert-notification';

const UpdateInfoPage = () => {
  const navigation = useNavigation<any>();
  type state = {
    id: number;
    abbreviation: string;
    name: string;
    country_id: number;
  };
  type country = {
    id: number;
    name: string;
    iso: string;
    states: state[];
  };
  type RegisterFormData = {
    email: string;
    company_name: string;
    user_name: string;
    phone: string;
    country_id: number;
    state_id: number;
    address: string;
    city: string;
  };
  const { userAuthToken } = useContext(UserContext);
  const [countries, setCountries] = useState<country[]>([]);
  const [states, setStates] = useState<state[]>([]);
  const [formData, setFormData] = useState<RegisterFormData>({
    company_name: '',
    address: '',
    city: '',
    email: '',
    user_name: '',
    phone: '',
    country_id: 0,
    state_id: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          'https://bidderapp.auctionmethod.com/amapi/user',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userAuthToken}`,
            },
          },
        );
        const json = await res.json();
        if (json.status == 'success') {
          console.log(json);
          const user = json.data;

          setFormData({
            email: user.email ?? '',
            company_name: user.company_name ?? '',
            user_name: user.user_name ?? '',
            phone: user.phone ?? '',
            country_id: user.country_id ?? 0,
            state_id: user.state_id ?? 0,
            address: user.address ?? '',
            city: user.city ?? '',
          });
          const infoRes = await fetch(
            'https://bidderapp.auctionmethod.com/amapi/register/info',
          );
          const infoJson = await infoRes.json();
          if (infoJson.status == 'success') {
            setCountries(infoJson?.data?.countries);
            const selectedCountry = infoJson?.data?.countries.find(
              (c: country) => c.id === user.country_id,
            );
            setStates(selectedCountry?.states || []);
          } else {
            ToastAlert(
              'Error',
              ALERT_TYPE.WARNING,
              'Error fetching inputs data',
            );
          }
        } else {
          ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching your info');
        }
      } catch (err) {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (
    name: keyof RegisterFormData,
    value: string | boolean | number,
  ) => {
    setFormData({ ...formData, [name]: value });
  };

  const updateBidder = async () => {
    try {
      const response = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/user',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );
      const json = await response.json();
      console.log(json);
      if (json.status == 'success') {
        ToastAlert('Success', ALERT_TYPE.SUCCESS, 'Info updated successfully');
      } else {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Error updating info');
      }
    } catch (error) {
      ToastAlert('Error', ALERT_TYPE.WARNING, 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headings}>
          <Text style={styles.heading}>Update Info</Text>
          <Text style={styles.subHeading}>
            Update your accounts info from below
          </Text>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconHeadingContainer}>
            <Icon name="person" size={28} color={'#094780'} />
            <Text style={styles.iconHeading}>Personal Info</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.user_name}
              placeholder="Username"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('user_name', v)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              placeholder="Phone"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('phone', v)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Company name</Text>
            <TextInput
              style={styles.input}
              value={formData.company_name}
              placeholder="Company name"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('company_name', v)}
            />
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconHeadingContainer}>
            <Icon name="home" size={28} color={'#094780'} />
            <Text style={styles.iconHeading}>Address</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Country</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectionColor={'#666'}
                selectedValue={formData.country_id}
                onValueChange={(v: any) => {
                  handleInputChange('country_id', v);
                  const selectedCountry = countries.find(c => c.id == v);
                  setStates(selectedCountry?.states || []);
                }}
              >
                <Picker.Item
                  label="Select country"
                  value=""
                  color="#666"
                  style={{ fontSize: 14 }}
                />
                {countries?.map((c: any) => (
                  <Picker.Item
                    key={c.id}
                    label={c.name}
                    value={c.id}
                    color="#666"
                    style={{ fontSize: 14 }}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>State</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectionColor={'#666'}
                selectedValue={formData.state_id}
                onValueChange={(v: any) => {
                  handleInputChange('state_id', v);
                }}
              >
                <Picker.Item
                  label="Select state"
                  value=""
                  color="#666"
                  style={{ fontSize: 14 }}
                />
                {states?.map((c: any) => (
                  <Picker.Item
                    key={c.id}
                    label={c.name}
                    value={c.id}
                    color="#666"
                    style={{ fontSize: 14 }}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.address}
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('address', v)}
            />
          </View>
          <View style={styles.rowInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>City</Text>
              <TextInput
                style={styles.input}
                value={formData.city}
                placeholder="City"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('city', v)}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={updateBidder}>
            <Text style={styles.buttonText}>Update Info</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  headings: {
    marginBottom: 20,
    gap: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4f24',
  },
  subHeading: {
    color: '#666',
  },
  sections: {
    marginBottom: 10,
  },
  iconHeadingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconHeading: {
    fontSize: 20,
    color: '#094780',
    fontWeight: 'bold',
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
  picker: {
    flex: 1,
    color: '#000',
  },

  dropdownIcon: {
    position: 'absolute',
    right: 10,
    pointerEvents: 'none',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  resultText: { marginTop: 20, color: 'blue', textAlign: 'center' },
  buttons: {
    gap: 10,
    flex: 1,
    alignItems: 'center',
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
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
  buttonSecondary: {
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#094780',
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
  rowInput: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
});
export default UpdateInfoPage;
