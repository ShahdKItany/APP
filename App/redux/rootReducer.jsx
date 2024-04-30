// rootReducer.jsx

import { combineReducers } from 'redux';
import cartReducer from '../Screens/CartScreen/CartReducer';
import WishlistReducer from '../Screens/WishList/WishlistReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  whishList :WishlistReducer
});



export default rootReducer;
