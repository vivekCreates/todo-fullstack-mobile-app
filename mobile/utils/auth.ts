import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const saveAuth = async (token: string, user: any) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

export const getAuth = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const user = await SecureStore.getItemAsync(USER_KEY);

  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearAuth = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
};
