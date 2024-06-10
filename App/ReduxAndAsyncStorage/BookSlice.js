import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import axios from 'axios';
import { Alert } from 'react-native'; // Import Alert for native environment

// Redux thunk to add a book to the cart
export const addToCart = createAsyncThunk(
  'books/addToCart',
  async (bookData, { getState, dispatch }) => {
    const state = getState();
    if (!state) {
      console.error('State is undefined or null');
      return;
    }
    const existingBook = state.books.booksInCart.find(book => book.id === bookData.id);
    if (existingBook) {
      console.error('Book already in cart');
      return;
    }
    const { id, title, price, image, quantity } = bookData;
    dispatch(addToCartSuccess({ id, title, price, image, quantity }));
  }
);

// Action creator for successful addition to cart
export const addToCartSuccess = createAction('books/addToCartSuccess');

// Reducer slice
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
    removeFromCart: (state, action) => {
      state.booksInCart = state.booksInCart.filter(book => book.id !== action.payload);
      const removedBook = state.booksInCart.find(book => book.id === action.payload);
      state.totalPrice -= removedBook.price * removedBook.quantity;
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const bookToUpdate = state.booksInCart.find(book => book.id === id);
      bookToUpdate.quantity++;
      state.totalPrice += bookToUpdate.price;
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const bookToUpdate = state.booksInCart.find(book => book.id === id);
      if (bookToUpdate.quantity > 1) {
        bookToUpdate.quantity--;
        state.totalPrice -= bookToUpdate.price;
      }
    },
    clearCart: (state) => {
      state.booksInCart = [];
      state.totalPrice = 0;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      // No need to handle anything here as the logic is already handled in the async thunk
    });
    builder.addCase(addToCartSuccess, (state, action) => {
      state.booksInCart.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    });
  },
});

export const {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  saveToken,
} = bookSlice.actions;

export const selectBooksInCart = (state) => state.books.booksInCart;
export const selectTotalPrice = (state) => state.books.totalPrice;
export const selectToken = (state) => state.books.token;

export default bookSlice.reducer;
