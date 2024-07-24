import './gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import store from './redux/store';
import {useDispatch} from 'react-redux';
import {setCartItems} from './redux/slices/cartSlice';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const AppContent = () => {
  const dispatch = useDispatch();

  const loadCartItems = async () => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      // console.log('cart items loaded from local storage', cartItems);
      dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error('failed to load cart items from local storage', error);
    }
  };
  useEffect(() => {
    loadCartItems();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
