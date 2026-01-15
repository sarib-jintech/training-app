import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import getAppStorageUsage from '../utils/getFolderSize';
import DeviceInfo from 'react-native-device-info';
import PieChart from 'react-native-pie-chart';

const StoragePage = () => {
  const bytesToMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };
  const [storageUsed, setStorageUsed] = useState<any>({});
  const [totalStorage, setTotalStorage] = useState('');
  const [totalUsed, setTotalUsed] = useState(0);
  const [series, setSeries] = useState<any>([{ value: 20, color: '#666' }]);
  useEffect(() => {
  const loadStorage = async () => {
    const bytes = await getAppStorageUsage();
    const total = await DeviceInfo.getTotalDiskCapacity();

    const documentMB = bytes.document / (1024 * 1024);
    const cacheMB = bytes.cache / (1024 * 1024);
    const tempMB = bytes.temp / (1024 * 1024);

    const totalUsedMB = documentMB + cacheMB + tempMB;

    setStorageUsed({
      document: documentMB,
      cache: cacheMB,
      temp: tempMB,
    });

    setTotalUsed(totalUsedMB);
    setTotalStorage((total / (1024 * 1024)).toFixed(2));

    setSeries([
      { value: documentMB, color: '#ff4f24' },
      { value: cacheMB, color: '#094780' },
      { value: tempMB, color: '#666' },
    ]);
  };

  loadStorage();
}, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>App Used</Text>
      <PieChart widthAndHeight={250} series={series} />
      <Text style={styles.subheadingGrey}>Storage used by app: {totalUsed.toFixed(2).toString()} MB</Text>
      <Text  style={styles.subheadingGrey}>Total device storage: {totalStorage} MB</Text>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={[styles.subheading, styles.colorPrimary]}>
            - Documents
          </Text>
          <Text style={styles.subheadingBlack}>{storageUsed?.document?.toFixed(2)} MB</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={[styles.subheading, styles.colorSecondary]}>
            - Cache
          </Text>
          <Text style={styles.subheadingBlack}>{storageUsed?.cache?.toFixed(2)} MB</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={[styles.subheading, styles.colorGrey]}>- Temp</Text>
          <Text style={styles.subheadingBlack}>{storageUsed?.temp?.toFixed(2)} MB</Text>
        </View>
      </View>
    </View>
  );
};

export default StoragePage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    color: '#ff4f24',
    fontWeight: 'bold',
    margin: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subheadingGrey: {
    fontSize: 20,
    color: '#666'
  },
  subheadingBlack: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
  },
  colorPrimary: {
    color: '#ff4f24',
  },
  colorSecondary: {
    color: '#094780',
  },
  colorGrey: {
    color: '#666',
  },
  line: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 1,
    backgroundColor: '#888',
    width: '100%',
  },
});
