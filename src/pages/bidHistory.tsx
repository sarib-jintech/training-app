import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALERT_TYPE } from 'react-native-alert-notification';
import ToastAlert from '../utils/toast';

const BidHistory = ({ route }: { route: any }) => {
  const item = route.params.item;
  const [auctionItems, setAuctionItems] = useState<any[]>([]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await fetch(
          `https://bidderapp.auctionmethod.com/amapi/auctions/bidhistory?itemid=${item.id}&auctionid=${item.auction_id}`,
        );
        const json = await res.json();
        if (json.status == 'success') {
          setAuctionItems(json?.data);
        } else {
          ToastAlert('Error', ALERT_TYPE.DANGER, 'Error fetching bid history');
        }
      } catch (err) {
        console.log(err);
        ToastAlert('Error', ALERT_TYPE.DANGER, 'Error fetching bid history');
      }
    };
    fetchBids();
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.detailContainer}>
        <Image source={{ uri: item.images?.[0] }} style={styles.image} />
        <Text style={styles.heading}>{item.title}</Text>
      </View>
      <View style={styles.historyContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoheading}>TIME OF BID</Text>
          <Text style={styles.infoheading}>BID AMOUNT</Text>
        </View>
        <View style={styles.line} />
        {auctionItems.length == 0 ? (
          <View style={styles.noHistoryContainer}>
            <Text style={styles.subHeadingMain}>NO HISTORY FOUND</Text>
          </View>
        ) : (
          <FlatList
            data={auctionItems}
            renderItem={({ item }) => (
              <>
                <View style={styles.row}>
                  <Text style={styles.subHeading}>
                    {formatDate(item.time_of_bid)}
                  </Text>
                  <Text style={styles.subHeading}>$ {item.amount}</Text>
                </View>
                <View style={styles.line} />
              </>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BidHistory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  heading: {
    color: '#ff4f24',
    fontSize: 18,
    flexShrink: 1,
  },
  subHeadingMain: {
    color: '#094780',
    fontSize: 24,
  },
  noHistoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  historyContainer: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoheading: {
    fontSize: 16,
    color: '#094780',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    margin: 10,
  },
  subHeading: {
    color: '#094780',
    fontSize: 20,
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
