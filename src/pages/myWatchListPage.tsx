import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/userContext';
import WatchlistItemCard from '../utils/watchlistItemCard';
import ToastAlert from '../utils/toast';
import { ALERT_TYPE } from 'react-native-alert-notification';

const MyWatchListPage = () => {
  const [auctionItems, setAuctionItems] = useState<any[]>([]);
  const { userAuthToken } = useContext(UserContext);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(
          `https://bidderapp.auctionmethod.com/amapi/user/watchlist`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userAuthToken}`,
            },
          },
        );
        const json = await res.json();
        console.log(json);
        if (json.status == 'success') {
          setAuctionItems(json?.data.items);
        } else {
          ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching watch list');
        }
      } catch (err) {
        console.log(err);
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching watch list');
      }
    };
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LIST OF ITEMS</Text>
      <View style={styles.line} />
      {auctionItems.length == 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemHeading}>NO ITEM ON YOUR WATCHLIST</Text>
        </View>
      ) : (
        <FlatList
          data={auctionItems}
          renderItem={({ item }) => <WatchlistItemCard item={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default MyWatchListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 16,
    color: '#094780',
  },
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemHeading: {
    fontSize: 20,
    color: '#094780',
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
