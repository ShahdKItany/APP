import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export const addToCart = createAsyncThunk(
  'books/addToCart',
  async (bookData, { getState, dispatch }) => {
    const state = getState();
    const existingBook = state.books.booksInCart.find(book => book.id === bookData.id);
    if (existingBook) {
      Alert.alert('-The book is already in the cart-الكتاب موجود بالفعل في العربة');
      //Alert Say : The book is already in the cart
      return;
    }
    const { id, title, price, image, quantity } = bookData;
    dispatch(addToCartSuccess({ id, title, price, image, quantity }));
  }
);

export const addToCartSuccess = createAction('books/addToCartSuccess');

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
      const removedBook = state.booksInCart.find(book => book.id === action.payload);
      state.booksInCart = state.booksInCart.filter(book => book.id !== action.payload);
      if (removedBook) {
        state.totalPrice -= removedBook.price * removedBook.quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.id === action.payload);
      if (bookToUpdate) {
        bookToUpdate.quantity++;
        state.totalPrice += bookToUpdate.price;
      }
    },
    decrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.id === action.payload);
      if (bookToUpdate && bookToUpdate.quantity > 1) {
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
    setCart: (state, action) => {
      state.booksInCart = action.payload.books;
      state.totalPrice = action.payload.totalPrice || 0; // Initialize totalPrice to 0 if undefined
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
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
  setCart,
} = bookSlice.actions;

export const selectBooksInCart = (state) => state.books.booksInCart;
export const selectTotalPrice = (state) => state.books.totalPrice;
export const selectToken = (state) => state.books.token;

export default bookSlice.reducer;
