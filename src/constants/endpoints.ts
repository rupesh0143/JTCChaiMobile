export const API_CONFIG = {
  BASE_URL: 'https://api.jtcchai.com/api',
  TIMEOUT: 15000,
};

export const ENDPOINTS = {
  PRODUCTS: {
    PAGE: '/products/page',
    BY_ID: (id: number) => `/products/${id}`,
    CATEGORY: '/products/category',
    IMAGE: (name: string) => `/products/image/${name}`,
  },

  CART: {
    ADD: '/cart/add',
    GET: '/cart/get',
    UPDATE: '/cart/update',
  },
};