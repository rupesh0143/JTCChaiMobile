import {apiClient} from './client';
import {ENDPOINTS} from '../constants/endpoints';

import {
  ProductApiItem,
  ProductsPageResponse,
} from '../types/productApi.types';

export const productsApi = {
  async getProducts(page = 1): Promise<ProductApiItem[]> {
    const response = await apiClient.post<ProductsPageResponse>(
      ENDPOINTS.PRODUCTS.PAGE,
      {
        pageno: page,
        itemno: null,
      },
    );

    return response.data.data;
  },

  async getProductById(id: number) {
    const response = await apiClient.get(
      ENDPOINTS.PRODUCTS.BY_ID(id),
    );

    return response.data;
  },

  async getCategories() {
    const response = await apiClient.get(
      ENDPOINTS.PRODUCTS.CATEGORY,
    );

    return response.data;
  },
};