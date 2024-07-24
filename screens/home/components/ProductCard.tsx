import {Button, Card, IconButton, Text} from 'react-native-paper';
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Product} from '../../../types/Product';
import {CartItem} from '../../../types/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartItems} from '../../../redux/slices/cartSlice';
import {useNavigation} from '@react-navigation/native';
import {setSelectedProduct} from '../../../redux/slices/selectedProductSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCartItems} from '../../../redux/slices/cartSlice';
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = memo(({product}) => {
  const [quantity, setQuantity] = React.useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const cartItems = useSelector(selectCartItems);

  const handleProductPress = (product: Product) => {
    dispatch(setSelectedProduct(product));
    navigation.navigate('ProductDetails');
  };

  useEffect(() => {
    const cartItem = cartItems?.find(
      (item: CartItem) => item.id === product.id,
    );
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems]);

  const addToCart = async (product: Product) => {
    try {
      const cartItemsJson = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      dispatch(setCartItems(cartItems));
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
        (item: CartItem) => item.id === product.id,
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
        (item: CartItem) => item.id === product.id,
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

  return (
    <Card style={styles.card} onPress={() => handleProductPress(product)}>
      <View style={styles.iconButtonContainer}>
        <IconButton
          icon={true ? 'star' : 'star-outline'}
          iconColor={false ? 'yellow' : 'yellow'}
          // containerColor={'rgba(255, 255, 255, 0.7)'}
          size={24}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <Card.Cover source={{uri: product.image}} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" style={styles.price}>
          {product.price}₺
        </Text>
        <Text variant="bodyMedium" style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
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
            <Button mode="contained" onPress={() => addToCart(product)}>
              Add to Cart
            </Button>
          )}
        </View>
      </Card.Actions>
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    width: '45%', // Each card takes up approximately 50% of the width minus gaps
  },
  iconButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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
    marginBottom: 10,
    fontSize: 16,
    height: 50,
  },
  actions: {
    paddingTop: 0,
    alignItems: 'center', // Centers the button horizontally
    justifyContent: 'center', // Centers the button vertically
  },
  buttonContainer: {
    width: '100%', // Ensures button takes up full width
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

export default ProductCard;
