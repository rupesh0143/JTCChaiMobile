import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // Keeping true ensures the Splash screen triggers on app launch
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    bootstrapAuth: (state) => {
      // Called when your Splash screen finish animating or loading credentials
      state.isLoading = false;
      state.isAuthenticated = false; 
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Correctly exporting actions and reducer
export const { bootstrapAuth, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;