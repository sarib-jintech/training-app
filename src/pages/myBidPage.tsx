import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/userContext';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyBidPage = () => {
  const [bids, setBids] = useState<any>([]);
  const { userAuthToken } = useContext(UserContext);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
    useEffect(() => {
      fetch(
        'https://bidderapp.auctionmethod.com/amapi/user/bids?limit=25',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userAuthToken}`,
          },
        },
      )
        .then(res => res.json())
        .then(data => setBids(data.items))
        .catch(err => console.error('Fetch error:', err));
    }, []);
//   console.log(bids);
//   useEffect(() => {
//     const bidsList = [
//       {
//         id: 2,
//         auction_id: 9,
//         title: 'checking',
//         description: 'checking',
//         end_time: '2024-07-01T01:00:00-0400',
//         current_bid: 5.0,
//         images: [
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d2e4ab0.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d3c297d.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d4a5725.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d584634.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d669962.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d754811.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d7e3609.jpg',
//           'https://bidderapp.auctionmethod.com/auctionimages/6/1720075985/w668646d8cdf92.jpg',
//         ],
//       },
//     ];

//     setBids(bidsList);
//   }, []);

  return (
    <View style={styles.mainContainer}>
      {bids.length != 0 && (
        <FlatList
          data={bids}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shadowWrapper}>
            <View style={styles.bidContainer}>
              <View style={styles.row}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <View style={styles.endRow}>
                    <Icon name="timer" size={20} color={'#666'} />
                    <Text style={styles.description}>Ends</Text>
                    <Text style={styles.description}>
                      {formatDate(item.end_time)}
                    </Text>
                  </View>
                  <View style={styles.bidRow}>
                    <View style={styles.column}>
                      <Text style={styles.secondaryHeading}>Starting Bid</Text>
                      <Text style={styles.primaryHeading}>
                        $ {item.current_bid}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.secondaryHeading}>Current</Text>
                      <Text style={styles.primaryHeading}>
                        $ {item.current_bid}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            </View>
          )}
        />
      )}
      {bids.length == 0 && (
        <>
          <View style={styles.noBidContainer}>
            <Text style={styles.noBidText}>No bids found</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noBidContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBidText: {
    fontSize: 20,
    color: '#094780',
  },
  bidContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  shadowWrapper: {
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flexDirection: 'column',
  },
  endRow: {
    flexDirection: 'row',
    gap: 5,
  },
  bidRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  infoContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4f24',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: '#999',
    fontSize: 16,
  },
  primaryHeading: {
    fontSize: 16,
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  secondaryHeading: {
    fontSize: 16,
    color: '#094780',
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 5,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#999',
    width: '100%',
  },
});

export default MyBidPage;
