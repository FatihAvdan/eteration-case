import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectSelectedProduct} from '../redux/slices/selectedProductSlice';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartItem} from '../types/CartItem';
import {Product} from '../types/Product';
import {setCartItems} from '../redux/slices/cartSlice';
import {useDispatch} from 'react-redux';
export default function ProductDetailsScreen() {
  const selectedProduct = useSelector(selectSelectedProduct);
  const [quantity, setQuantity] = React.useState(0);
  const dispatch = useDispatch();
  const checkCartItems = async () => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      const index = cartItems.findIndex(
        (item: CartItem) => selectedProduct && selectedProduct.id === item.id,
      );

      if (index !== -1) {
        setQuantity(cartItems[index].quantity);
      }
      console.log('cart items loaded from local storage', cartItems);
    } catch (error) {
      console.error('failed to load cart items from local storage', error);
    }
  };

  React.useEffect(() => {
    checkCartItems();
  }, []);

  const addToCart = async (selectedProduct: Product) => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      cartItems.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      dispatch(setCartItems(cartItems));
      setQuantity(1);
    } catch (error) {
      console.error('Failed to add product to cart', error);
    }
  };
  const handleIncrease = async () => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      console.log('cartItems', cartItems);
      const index = cartItems.findIndex(
        (item: CartItem) => selectedProduct && item.id === selectedProduct.id,
      );
      console.log('index', index);
      if (index !== -1) {
        cartItems[index].quantity += 1;
        console.log('ekledim');
        setQuantity(cartItems[index].quantity);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
      // dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error('Failed to increase product quantity', error);
    }
  };

  const handleDecrease = async () => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      const index = cartItems.findIndex(
        (item: CartItem) => selectedProduct && item.id === selectedProduct.id,
      );
      if (index !== -1) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
          setQuantity(cartItems[index].quantity);
          await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
          cartItems.splice(index, 1);
          setQuantity(0);
          dispatch(setCartItems(cartItems));
          await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      }
    } catch (error) {
      console.error('Failed to increase product quantity', error);
    }
  };

  if (!selectedProduct) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Cover
            source={{uri: selectedProduct.image}}
            style={styles.image}
          />
          <Card.Content style={styles.content}>
            <Text variant="titleLarge" style={styles.name}>
              {selectedProduct.name}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {selectedProduct.description}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={styles.actions}>
        <View style={{flexDirection: 'column', marginLeft: 10}}>
          <Text style={styles.price}>Price:</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {selectedProduct.price} ₺
          </Text>
          {/* <Avatar.Icon icon="heart" size={30} /> */}
        </View>
        <View style={styles.buttonContainer}>
          {quantity > 0 ? (
            <View style={styles.buttonContainer}>
              <Button
                style={styles.smallButton}
                mode="contained"
                onPress={handleDecrease}
                disabled={quantity <= 0}>
                -
              </Button>
              <Text style={styles.quantity}>{quantity}</Text>
              <Button
                mode="contained"
                onPress={handleIncrease}
                style={styles.smallButton}>
                +
              </Button>
            </View>
          ) : (
            <Button mode="contained" onPress={() => addToCart(selectedProduct)}>
              Add to Cart
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  content: {
    padding: 10,
    paddingBottom: 0,
  },
  price: {
    marginBottom: 5,
    color: 'blue',
    fontSize: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
  },
  scrollView: {
    paddingBottom: 70, // ScrollView içeriğinin alt kısmında boşluk bırak
  },
  actions: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'white', // Button'un arkaplan rengi
    borderTopWidth: 1,
    borderColor: '#ccc', // Border rengi
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%', // Ensures button takes up full width
    alignItems: 'center', // Centers button horizontally
    justifyContent: 'center', // Centers button vertically
    flexDirection: 'row', // Arranges buttons horizontally
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  smallButton: {
    width: 15,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
