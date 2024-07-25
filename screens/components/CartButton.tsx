import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectCartItems,
  addCartItem,
  changeQuantity,
} from '../../redux/slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../../types/Product';
import {CartItem} from '../../types/CartItem';
import {Button} from 'react-native-paper';

const CartButton = ({product}: {product: Product | CartItem}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [quantity, setQuantity] = React.useState(0);
  React.useEffect(() => {
    const cartItem = cartItems.find(item => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, dispatch]);

  const addToCart = async () => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];

      const index = cartItems.findIndex(
        (item: {id: string}) => item.id === product.id,
      );
      if (index === -1) {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        };
        cartItems.push(cartItem);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch(addCartItem(cartItem));
        setQuantity(1);
      }
    } catch (error) {
      console.error('Failed to add product to cart', error);
    }
  };

  const changeQuantityFun = async (id: string, change: number) => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      const index = cartItems.findIndex((item: {id: string}) => item.id === id);

      if (index !== -1) {
        const newQuantity = cartItems[index].quantity + change;
        if (newQuantity > 0) {
          cartItems[index].quantity = newQuantity;
        } else {
          cartItems.splice(index, 1);
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch(changeQuantity({id, quantity: newQuantity}));
        setQuantity(newQuantity);
      }
    } catch (error) {
      console.error('Failed to change product quantity', error);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {quantity > 0 ? (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.smallButton}
            mode="contained"
            onPress={() => changeQuantityFun(product.id, -1)}
            disabled={quantity <= 0}>
            -
          </Button>
          <Text style={styles.quantity}>{quantity}</Text>
          <Button
            mode="contained"
            onPress={() => changeQuantityFun(product.id, 1)}
            style={styles.smallButton}>
            +
          </Button>
        </View>
      ) : (
        <Button mode="contained" onPress={addToCart}>
          Add to Cart
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    color: 'white',
  },
  smallButton: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(CartButton);
