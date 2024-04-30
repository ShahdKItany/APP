// Actions.jsx

// استيراد أنواع الإجراءات المحددة
import { ADD_TO_CART, REMOVE_FROM_CART } from './ActionTypes'; // استبدال 'ActionTypes' بالملف المناسب

// إجراء لإضافة عنصر إلى عربة التسوق
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// إجراء لإزالة عنصر من عربة التسوق
export const removeFromCart = (index) => {
  return {
    type: REMOVE_FROM_CART,
    payload: index,
  };
};
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './ActionTypes'; // استبدال 'ActionTypes' بالملف المناسب

// إجراء لإضافة عنصر إلى عربة التسوق
export const addToWhishList = (item) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: item,
  };
};

// إجراء لإزالة عنصر من عربة التسوق
export const removeFromWhishList = (index) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: index,
  };
};
