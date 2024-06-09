// App\ReduxAndAsyncStorage\BookSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booksInCart: [],
  totalPrice: 0,
  token: '',
  loading: true,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Add to cart logic
    },
    removeFromCart: (state, action) => {
      // Remove from cart logic
    },
    incrementQuantity: (state, action) => {
      // Increment quantity logic
    },
    decrementQuantity: (state, action) => {
      // Decrement quantity logic
    },
    clearCart: (state) => {
      // Clear cart logic
    },
    setCart: (state, action) => {
      state.booksInCart = action.payload;
      state.totalPrice = action.payload.reduce((total, book) => total + book.price * book.quantity, 0);
    },
    saveToken: (state, action) => {
      state.token = action.payload;
      state.loading = false; // Set loading to false when token is loaded
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCart,
  saveToken,
} = bookSlice.actions;

export const selectBooksInCart = (state) => state.books.booksInCart;
export const selectTotalPrice = (state) => state.books.totalPrice;
export const selectToken = (state) => state.books.token;

export default bookSlice.reducer;
