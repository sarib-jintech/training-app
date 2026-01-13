import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import AuctionItemCard from '../utils/auctionItemCard';

type AuctionItemRouteProp = RouteProp<
  {
    AuctionItem: { auctionId: number };
  },
  'AuctionItem'
>;
const AuctionItemPage = ({ route }: { route: AuctionItemRouteProp }) => {
  const [auctionItems, setAuctionItems] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      `https://bidderapp.auctionmethod.com/amapi/auctions/items?limit=25&offset=0&sort=end_date&sort_direction=ascending&hideclosed=1&auctionid=${route.params.auctionId}`,
    )
      .then(res => res.json())
      .then(data => setAuctionItems(data.auction.items))
      .catch(err => console.error('Fetch error:', err));
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
