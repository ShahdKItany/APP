import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  books: [],
  totalPrice: 0,
};

export const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingBook = state.books.find((book) => book.id === id);
      if (existingBook) {
        // Item already exists in the cart, you can update its quantity here if needed
        // For example: existingBook.quantity += 1;
        // Alternatively, you can return early without adding it again
        Alert.alert("Duplicate Item", "This item is already in your cart.", [
          { text: "OK", onPress: () => {} },
        ]);
        return;
      }
      state.books.push(action.payload);
      state.totalPrice = state.books.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      state.totalPrice = state.books.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      );
    },
    incrementQuantity: (state, action) => {
      const book = state.books.find((book) => book.id === action.payload);
      if (book) {
        book.quantity += 1;
        state.totalPrice = state.books.reduce(
          (total, book) => total + book.price * book.quantity,
          0
        );
      }
    },
    decrementQuantity: (state, action) => {
      const book = state.books.find((book) => book.id === action.payload);
      if (book && book.quantity > 1) {
        book.quantity -= 1;
        state.totalPrice = state.books.reduce(
          (total, book) => total + book.price * book.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.books = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = BookSlice.actions;

export const selectTotalPrice = (state) => state.books.totalPrice;

export const selectBooksInCart = (state) => state.book.books;

export default BookSlice.reducer;
