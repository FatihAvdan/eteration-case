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
import {loadFavoritesFromStorage} from './redux/slices/favoritesSlice';
import {loadCartFromStorage} from './redux/slices/cartSlice';
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Favori ürünleri AsyncStorage'dan yükle
    store.dispatch(loadFavoritesFromStorage());
    store.dispatch(loadCartFromStorage());
  }, []);
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
