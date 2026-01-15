import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  Image,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import SettingPage from './settingPage';
import InvoicesPage from './invoicesPage';
import MyBidPage from './myBidPage';
import ContactUsPage from './contactUsPage';
import StoragePage from './storagePage';
import AboutUsPage from './aboutUsPage';
import MyWatchListPage from './myWatchListPage';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ToastAlert from '../utils/toast';

interface Auction {
  id: number;
  title: string;
  starts: string;
  ends: string;
  lead_image: string;
}

const Drawer = createDrawerNavigator();

const Homepage = () => {
  const navigator = useNavigation<any>();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderItem: ListRenderItem<Auction> = ({ item }) => (
    <Pressable
      onPress={() => {
        navigator.navigate('AuctionItem', { auctionId: item.id });
      }}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item.lead_image }}
          style={{
            width: '100%',
            height: 200,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.itemHeading}>{item.title}</Text>
          <View style={styles.timeContainer}>
            <View style={styles.startTime}>
              <Text style={styles.itemSubHeading}>Start time</Text>
              <Text style={styles.itemValue}>{formatDate(item.starts)}</Text>
            </View>
            <View style={styles.endTime}>
              <Text style={styles.itemSubHeading}>End time</Text>
              <Text style={styles.itemValue}>{formatDate(item.ends)}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const HomeScreen = () => (
    <View style={styles.center}>
      <Text style={styles.heading}>CURRENT LIVE AUCTIONS</Text>
      <FlatList
        data={auctions}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

  useEffect(() => {
    fetch('https://bidderapp.auctionmethod.com/amapi/auctions?limit=25')
      .then(res => res.json())
      .then(data => setAuctions(data.auctions))
      .catch(() => {
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching auctions');
      });
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#094780',
        drawerStyle: {
          backgroundColor: '#094780',
          width: 280,
        },
        drawerActiveBackgroundColor: '#ff4f24',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ddd',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
        }}
      />
      <Drawer.Screen
        name="My Invoices"
        component={InvoicesPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="My Bids"
        component={MyBidPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Watch List"
        component={MyWatchListPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Storage"
        component={StoragePage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutUsPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingPage}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#ff4f24',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    margin: 5,
  },
  info: {
    padding: 20,
    gap: 20,
  },
  heading: {
    fontSize: 18,
    color: '#094780',
    fontWeight: 'bold',
  },
  itemHeading: {
    fontSize: 20,
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  itemSubHeading: {
    color: '#094780',
    fontWeight: 'bold',
  },
  itemValue: {
    color: '#666',
    fontSize: 16,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  startTime: {
    flex: 1,
  },
  endTime: {
    flex: 1,
  },
});

export default Homepage;
