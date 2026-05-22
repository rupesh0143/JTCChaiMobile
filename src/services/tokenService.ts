import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'jtc_auth_token';

export const tokenService = {
  async saveToken(token: string) {
    await Keychain.setGenericPassword('token', token, {
      service: TOKEN_KEY,
    });
  },

  async getToken() {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_KEY,
    });

    if (!credentials) {
      return null;
    }

    return credentials.password;
  },

  async removeToken() {
    await Keychain.resetGenericPassword({
      service: TOKEN_KEY,
    });
  },
};