import {apiClient} from './client';
import {ENDPOINTS} from '../constants/endpoints';

interface AddCartPayload {
  userid: number;
  itemcode: string;
  quantity: number;
  price: number;
  weight: number;
}

interface UpdateCartPayload {
  userid: number;
  itemcode: string;
  quantity: number;
}

export const cartApi = {
  async addToCart(payload: AddCartPayload) {
    const response = await apiClient.post(
      ENDPOINTS.CART.ADD,
      payload,
    );

    return response.data;
  },

  async getCart(userid: number) {
    const response = await apiClient.post(
      ENDPOINTS.CART.GET,
      {
        userid,
      },
    );

    return response.data;
  },

  async updateCart(payload: UpdateCartPayload) {
    const response = await apiClient.post(
      ENDPOINTS.CART.UPDATE,
      payload,
    );

    return response.data;
  },
};