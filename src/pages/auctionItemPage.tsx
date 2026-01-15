import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import AuctionItemCard from '../utils/auctionItemCard';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ToastAlert from '../utils/toast';

type AuctionItemRouteProp = RouteProp<
  {
    AuctionItem: { auctionId: number };
  },
  'AuctionItem'
>;
const AuctionItemPage = ({ route }: { route: AuctionItemRouteProp }) => {
  const [auctionItems, setAuctionItems] = useState<any[]>([]);
  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const res = await fetch(
          `https://bidderapp.auctionmethod.com/amapi/auctions/items?limit=25&hideclosed=1&auctionid=${route.params.auctionId}`,
        );
        const json = await res.json();
        if (json.status == 'success') {
          setAuctionItems(json?.auction?.items);
        } else {
          ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching items');
        }
      } catch (err) {
        console.log(err);
        ToastAlert('Error', ALERT_TYPE.WARNING, 'Error fetching items');
      }
    };
    fetchAuctionItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LIST OF ITEMS</Text>
      <View style={styles.line} />
      <FlatList
        data={auctionItems}
        renderItem={({ item }) => <AuctionItemCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default AuctionItemPage;

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

  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
