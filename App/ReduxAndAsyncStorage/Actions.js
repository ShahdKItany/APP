import { saveToken as asyncStoreToken, getToken as asyncGetToken, removeToken as asyncRemoveToken } from './Storage';
import { saveToken } from './BookSlice';

export const storeToken = (token) => async (dispatch) => {
  await asyncStoreToken(token);
  dispatch(saveToken(token));
  console.log('Token saved:', token); // Print token to console after saving
};

export const loadToken = () => async (dispatch) => {
  const token = await asyncGetToken();
  if (token) {
    dispatch(saveToken(token));
    console.log('Token loaded:', token); // Print token to console after loading
  }
};

export const clearToken = () => async (dispatch) => {
  await asyncRemoveToken();
  dispatch(saveToken(''));
};
