import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';

// Async thunk to fetch book details
export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async ({ bookId, token }) => {
    const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `AmanGRAD__${token}`,
      },
    });
    return response.data.book;
  }
);

export const addToCart = createAsyncThunk(
  'books/addToCart',
  async (bookData, { getState, dispatch }) => {
    const state = getState();
    const existingBook = state.books.booksInCart.find(book => book.id === bookData.id);
    if (existingBook) {
      Alert.alert('الكتاب موجود بالفعل في العربة');
      return;
    }
    const { BookID, title, price, mainImage, quantity } = bookData;
    dispatch(addToCartSuccess({ BookID, title, price, mainImage, quantity }));
  }
);

export const addToCartSuccess = createAction('books/addToCartSuccess');

const initialState = {
  booksInCart: [],
  totalPrice: 0,
  token: '',
  username: '',
  loading: true,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const removedBook = state.booksInCart.find(book => book.BookID === action.payload);
      state.booksInCart = state.booksInCart.filter(book => book.BookID !== action.payload);
      if (removedBook) {
        state.totalPrice -= removedBook.price * removedBook.quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.BookID === action.payload);
      if (bookToUpdate) {
        bookToUpdate.quantity++;
        state.totalPrice += bookToUpdate.price;
      }
    },
    decrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.BookID === action.payload);
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
    saveUsername: (state, action) => {
      state.username = action.payload;
    },
    setCart: (state, action) => {
      state.booksInCart = action.payload.books;
      state.totalPrice = action.payload.totalPrice || 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {});
    builder.addCase(addToCartSuccess, (state, action) => {
      state.booksInCart.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    });
    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      const bookIndex = state.booksInCart.findIndex(book => book.BookID === action.payload.BookID);
      if (bookIndex >= 0) {
        state.booksInCart[bookIndex] = {
          ...state.booksInCart[bookIndex],
          ...action.payload,
        };
      }
    });
  },
});

export const {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  saveToken,
  saveUsername,
  setCart,
} = bookSlice.actions;

export const selectBooksInCart = (state) => state.books.booksInCart;
export const selectTotalPrice = (state) => state.books.totalPrice;
export const selectToken = (state) => state.books.token;
export const selectUsername = (state) => state.books.username;

export default bookSlice.reducer;
