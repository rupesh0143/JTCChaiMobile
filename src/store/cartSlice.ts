import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface CartItem {
  cartId: string;

  id: number;

  itemcode: string;

  title: string;

  image: string;

  quantity: number;

  price: number;

  weight?: number;
}

interface CartState {
  items: CartItem[];

  totalItems: number;

  totalPrice: number;
}

const initialState: CartState = {
  items: [],

  totalItems: 0,

  totalPrice: 0,
};

const calculateTotals = (
  state: CartState,
) => {
  state.totalItems = state.items.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  state.totalPrice = state.items.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart(
      state,
      action: PayloadAction<CartItem>,
    ) {
      const existingItem =
        state.items.find(
          item =>
            item.cartId ===
            action.payload.cartId,
        );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,

          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    increaseQuantity(
      state,
      action: PayloadAction<string>,
    ) {
      const item = state.items.find(
        cartItem =>
          cartItem.cartId ===
          action.payload,
      );

      if (item) {
        item.quantity += 1;
      }

      calculateTotals(state);
    },

    decreaseQuantity(
      state,
      action: PayloadAction<string>,
    ) {
      const itemIndex =
        state.items.findIndex(
          cartItem =>
            cartItem.cartId ===
            action.payload,
        );

      if (itemIndex !== -1) {
        const item =
          state.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(
            itemIndex,
            1,
          );
        }
      }

      calculateTotals(state);
    },

    removeFromCart(
      state,
      action: PayloadAction<string>,
    ) {
      state.items =
        state.items.filter(
          item =>
            item.cartId !==
            action.payload,
        );

      calculateTotals(state);
    },

    clearCart(state) {
      state.items = [];

      state.totalItems = 0;

      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,

  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;