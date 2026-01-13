import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AuctionItemCard = ({ item }: { item: any }) => {
  const navigator = useNavigation<any>();
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
  const [bid, setBid] = useState('');
  const [result, setResult] = useState('');
  const handleBid = async () => {
    try {
      const response = await fetch(
        'https://bidderapp.auctionmethod.com/amapi/auctions/bids',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            auctionid: item.auction_id,
            itemid: item.id,
            amount: parseFloat(bid),
            terms_agreed: true,
          }),
        },
      );
      const json = await response.json();
      setResult(json.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.images?.[0] }} style={styles.image} />

        <Pressable
          style={styles.favoriteIcon}
          onPress={() =>
            navigator.navigate('BidHistory', {
              item: item,
            })
          }
        >
          <Icon name="history" size={24} color="#ff4f24" />
        </Pressable>
        {/* <Pressable style={styles.historyIcon}>
          <Icon name="favorite-border" size={24} color="#ff4f24" />
        </Pressable> */}
      </View>

      <View style={styles.info}>
        <Text style={styles.itemHeading}>{item.title}</Text>

        <View style={styles.timeContainer}>
          <View style={styles.timeBox}>
            <View style={styles.row}>
              <Icon name="calendar-today" color={'#094780'} size={16} />
              <Text style={styles.itemSubHeading}>Start</Text>
            </View>
            <Text style={styles.itemValue}>{formatDate(item.start_time)}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.timeBox}>
            <View style={styles.row}>
              <Icon name="clear" color={'#094780'} size={16} />
              <Text style={styles.itemSubHeading}>End</Text>
            </View>
            <Text style={styles.itemValue}>{formatDate(item.end_time)}</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.timeBox}>
          <View style={styles.row}>
            <Icon name="gavel" color={'#094780'} size={16} />
            <Text style={styles.itemSubHeading}>Current Bid</Text>
          </View>
          <Text style={styles.itemBid}>${item.current_bid}</Text>
        </View>
      </View>
      <View style={styles.bidButtonContainer}>
        <TextInput
          style={styles.bidInput}
          placeholder="Enter your bid"
          placeholderTextColor={'#666'}
          onChangeText={setBid}
          value={bid}
        />
        <Pressable onPress={handleBid} style={styles.buttonBid}>
          <Text style={styles.buttonText}>Bid now</Text>
        </Pressable>
      </View>
      <View style={styles.resultContainer}>
        <Text>{result}</Text>
      </View>
    </View>
  );
};

export default AuctionItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info: {
    padding: 20,
    gap: 15,
  },
  itemHeading: {
    fontSize: 20,
    color: '#ff4f24',
    fontWeight: 'bold',
  },
  itemSubHeading: {
    color: '#094780',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemValue: {
    color: '#666',
    fontSize: 16,
  },
  itemBid: {
    color: '#094780',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeContainer: {},
  timeBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bidButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    gap: 5,
  },
  bidInput: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#094780',
    flex: 2,
    color: '#666',
  },
  buttonBid: {
    flex: 1,
    padding: 15,
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: '#094780',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  historyIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
