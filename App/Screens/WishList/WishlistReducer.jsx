// WishlistReducer.jsx



import { ADD_TO_WISHLIST } from '../../redux/Actions';
import WishList from './WishList';

const initialState = {
  cartItems: [],
};

const WishlistReduce = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export default WishlistReduce;
