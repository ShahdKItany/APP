



//App\ReduxAndAsyncStorage\AuthComponent.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from './Actions';
import { selectToken } from './BookSlice';

const AuthComponent = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const loading = useSelector((state) => state.books.loading);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return token ? <Home /> : <Login />;
};

export default AuthComponent;
