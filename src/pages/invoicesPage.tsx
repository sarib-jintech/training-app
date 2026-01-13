import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/userContext';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<any>([]);
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
        'https://bidderapp.auctionmethod.com/amapi/user/invoices?limit=25',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userAuthToken}`,
          },
        },
      )
        .then(res => res.json())
        .then(data => setInvoices(data.data))
        .catch(err => console.error('Fetch error:', err));
    }, []);
//   console.log(invoices);
//   useEffect(() => {
//     const invoiceList = [
//       {
//         id: 2,
//         auction_id: 9,
//         title: 'checking',
//         created: '2024-07-01T01:00:00-0400',
//         item_count: 5,
//         sub_total: 75,
//         paid: false,
//       },
//     ];

//     setInvoices(invoiceList);
//   }, []);

  return (
    <View style={styles.mainContainer}>
      {invoices.length != 0 && (
        <FlatList
          data={invoices}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <View style={styles.invoiceContainer}>
                <View style={styles.row}>
                  {item.paid && (
                    <View style={styles.iconContainerPaid}>
                      <Icon name="check-circle" size={24} color={'#666666ff'} />
                    </View>
                  )}
                  {!item.paid && (
                    <View style={styles.iconContainerUnpaid}>
                      <Icon
                        name="pending-actions"
                        size={24}
                        color={'#ff4f24'}
                      />
                    </View>
                  )}
                  <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{formatDate(item.created)}</Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>${item.sub_total}</Text>
                    {item.paid && <Text style={styles.paidInfo}>Paid</Text>}
                    {!item.paid && (
                      <Text style={styles.unpaidInfo}>Unpaid</Text>
                    )}
                  </View>
                </View>
                {!item.paid && (
                  <>
                    <View style={styles.line} />
                    <View style={styles.payButtonContainer}>
                      <Text style={styles.description}>{item.title}</Text>
                      <Pressable onPress={() => {}}>
                        <Text style={styles.primaryHeading}>Pay now</Text>
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
            </>
          )}
        />
      )}
      {invoices.length == 0 && (
        <>
          <View style={styles.noInvoiceContainer}>
            <Text style={styles.noInvoiceText}>No invoice found</Text>
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
  noInvoiceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noInvoiceText: {
    fontSize: 20,
    color: '#094780',
  },
  invoiceContainer: {
    borderRadius: 20,
    borderColor: '#afafafff',
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  iconContainerPaid: {
    padding: 15,
    backgroundColor: '#eeeeeeff',
    borderRadius: 15,
    justifyContent: 'center',
  },
  iconContainerUnpaid: {
    padding: 15,
    backgroundColor: '#ffb9a7ff',
    borderRadius: 15,
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: '#999',
  },
  amountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  paidInfo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#bee9b2ff',
    borderRadius: 10,
    color: '#319300ff',
  },
  unpaidInfo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5d1c8ff',
    borderRadius: 10,
    color: '#ff4f24',
  },
  amountText: {
    color: '#094780',
    fontWeight: 'bold',
    fontSize: 18,
  },
  payButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  primaryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4f24',
  },
  line: {
    marginVertical: 5,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#999',
    width: '100%',
  },
});

export default InvoicesPage;
