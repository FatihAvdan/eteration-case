import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setCartItems} from '../redux/slices/cartSlice';
export default function CartScreen() {
  const dispatch = useDispatch();
  const resetCart = async () => {
    // Reset cart
    await AsyncStorage.setItem('cartItems', JSON.stringify([]));
    dispatch(setCartItems([]));
  };
  return (
    <View>
      <Text>Cart</Text>
      <Button mode="contained" onPress={() => resetCart()}>
        Press me
      </Button>
    </View>
  );
}
