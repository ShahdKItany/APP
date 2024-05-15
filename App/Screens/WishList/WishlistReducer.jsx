const initialState = {
  WishlistItems: [],
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle ADD_TO_WISHLIST and REMOVE_FROM_WISHLIST actions
    default:
      return state;
  }
};

export default WishlistReducer;
