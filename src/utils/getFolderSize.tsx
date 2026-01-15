import RNFS from 'react-native-fs';

const getFolderSize = async (path: string): Promise<number> => {
  let size = 0;

  try {
    const files = await RNFS.readDir(path);

    for (const file of files) {
      if (file.isFile()) {
        size += file.size;
      } else if (file.isDirectory()) {
        size += await getFolderSize(file.path);
      }
    }
  } catch (e) {
    console.log('FS error:', e);
  }

  return size;
};
const bytesToMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };
const getAppStorageUsage = async () => {
  const documentSize = await getFolderSize(RNFS.DocumentDirectoryPath);
  const cacheSize = await getFolderSize(RNFS.CachesDirectoryPath);
  const tempSize = RNFS.TemporaryDirectoryPath
    ? await getFolderSize(RNFS.TemporaryDirectoryPath)
    : 0;

  return {
    document: documentSize,
    cache: cacheSize,
    temp: tempSize,
  };
};


export default getAppStorageUsage;
