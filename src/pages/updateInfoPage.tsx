import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

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
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    user_name: string;
    phone: string;
    country_id: number;
    state_id: number;
    address: string;
    city: string;
    zip: string;
    ship_country: number;
    ship_state: number;
    ship_address: string;
    ship_city: string;
    ship_zip: string;
    ship_residential: number;
    accept_terms: boolean;
  };
  const [countries, setCountries] = useState<country[]>([]);
  const [states, setStates] = useState<state[]>([]);
  const [shipCountries, setShipCountries] = useState<country[]>([]);
  const [shipStates, setShipStates] = useState<state[]>([]);
  const [registerInfo, setRegisterInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState<RegisterFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    user_name: '',
    phone: '',
    country_id: 0,
    address: '',
    city: '',
    state_id: 0,
    zip: '',
    accept_terms: false,
    ship_address: '',
    ship_city: '',
    ship_state: 0,
    ship_zip: '',
    ship_country: 0,
    ship_residential: 0,
  });

  useEffect(() => {
    fetch('https://bidderapp.auctionmethod.com/amapi/register/info')
      .then(res => res.json())
      .then(data => {
        setRegisterInfo(data);
        setCountries(data.data.countries);
        setShipCountries(data.data.countries);
        setLoading(false);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleInputChange = (
    name: keyof RegisterFormData,
    value: string | boolean | number,
  ) => {
    setFormData({ ...formData, [name]: value });
  };
  async function checkEmail(email: String) {
    try {
      const response = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/register/checkemail',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const json = await response.json();
      if (JSON.stringify(json.status) == 'success') {
        setResult('User with same email exist');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      setResult('Registration Failed');
      return false;
    }
  }
  const registerBidder = async () => {
    try {
      if (await checkEmail(formData.email)) {
        const response = await fetch(
          'https://bidderapp.auctionmethod.com/amapi/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          },
        );
        const json = await response.json();
        setResult(JSON.stringify(json));
      }
    } catch (error) {
      setResult('Registration Failed');
    }
  };
  const handleResendEmail = () => {
    navigation.navigate('ResendEmail');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headings}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subHeading}>
            Sign up to start bidding and managing auctions.
          </Text>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconHeadingContainer}>
            <Icon name="person" size={28} color={'#094780'} />
            <Text style={styles.iconHeading}>Personal Info</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.rowInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('firstname', v)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('lastname', v)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('user_name', v)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('email', v)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('password', v)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('phone', v)}
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
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('address', v)}
            />
          </View>
          <View style={styles.rowInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('city', v)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Zip code</Text>
              <TextInput
                style={styles.input}
                placeholder="Zip Code"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('zip', v)}
              />
            </View>
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconHeadingContainer}>
            <Icon name="outbox" size={28} color={'#094780'} />
            <Text style={styles.iconHeading}>Shipping Address</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Ship country</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectionColor={'#666'}
                selectedValue={formData.ship_country}
                onValueChange={(v: any) => {
                  handleInputChange('ship_country', v);
                  const selectedCountry = shipCountries.find(c => c.id == v);
                  setShipStates(selectedCountry?.states || []);
                }}
              >
                <Picker.Item
                  label="Select ship country"
                  value=""
                  color="#666"
                  style={{ fontSize: 14 }}
                />
                {shipCountries?.map((c: any) => (
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
            <Text style={styles.inputHeading}>Ship state</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectionColor={'#666'}
                selectedValue={formData.ship_state}
                onValueChange={(v: any) => {
                  handleInputChange('ship_state', v);
                }}
              >
                <Picker.Item
                  label="Select ship state"
                  value=""
                  color="#666"
                  style={{ fontSize: 14 }}
                />
                {shipStates?.map((c: any) => (
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
            <Text style={styles.inputHeading}>Ship address</Text>
            <TextInput
              style={styles.input}
              placeholder="Ship address"
              placeholderTextColor={'#666'}
              onChangeText={v => handleInputChange('ship_address', v)}
            />
          </View>
          <View style={styles.rowInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Ship city</Text>
              <TextInput
                style={styles.input}
                placeholder="Ship city"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('ship_city', v)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputHeading}>Ship zip code</Text>
              <TextInput
                style={styles.input}
                placeholder="Ship zip Code"
                placeholderTextColor={'#666'}
                onChangeText={v => handleInputChange('ship_zip', v)}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text>Accept Terms & Conditions</Text>
          <Switch
            value={formData.accept_terms}
            onValueChange={v => handleInputChange('accept_terms', v)}
          />
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={registerBidder}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Text>or</Text>
          <Pressable onPress={handleResendEmail} style={styles.buttonSecondary}>
            <Text style={styles.buttonText}>Resend activation email</Text>
          </Pressable>
        </View>
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
export default UpdateInfoPage