import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartItems, setCartItems} from '../redux/slices/cartSlice';
import {CartItem} from '../types/CartItem';
import CartButton from './components/CartButton';
const CartScreen = () => {
  const cartItems = useSelector(selectCartItems);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  React.useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  const singleItem = (item: CartItem) => {
    return (
      <View style={styles.singleBody} key={item.id}>
        <View style={styles.priceDiv}>
          <Text style={{color: 'white'}}>{item.name}</Text>
          <Text style={{color: 'pink'}}>{item.price} ₺</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CartButton product={item} />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {cartItems.map(item => singleItem(item))}
        </ScrollView>
      </View>
      <View style={styles.actions}>
        <View style={{flexDirection: 'column', marginLeft: 10}}>
          <Text style={styles.price}>Price:</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{totalPrice} ₺</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => console.log('Complete')}>
            Complete
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    backgroundColor: '#242B42',
  },
  scrollView: {
    paddingBottom: 70, // ScrollView içeriğinin alt kısmında boşluk bırak
  },
  singleBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceDiv: {
    width: '50%',
  },

  price: {
    marginBottom: 5,
    color: 'blue',
    fontSize: 16,
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actions: {
    position: 'absolute',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default CartScreen;
