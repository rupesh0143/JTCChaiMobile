import NetInfo from '@react-native-community/netinfo';

export const checkNetwork = async () => {
  const state = await NetInfo.fetch();

  return Boolean(state.isConnected);
};