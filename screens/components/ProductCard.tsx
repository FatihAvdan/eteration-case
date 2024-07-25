import {Card, Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Product} from '../../types/Product';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSelectedProduct} from '../../redux/slices/selectedProductSlice';

// Components
import CartButton from './CartButton';
import FavoritesView from './FavoritesView';
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = React.memo(({product}) => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // Cart

  // State
  const handleProductPress = (product: Product) => {
    dispatch(setSelectedProduct(product));
    navigation.navigate('ProductDetails');
  };

  return (
    <Card style={styles.card} onPress={() => handleProductPress(product)}>
      <FavoritesView id={product.id.toString()} />
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
        <CartButton product={product} />
      </Card.Actions>
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    width: '45%',
    backgroundColor: '#1A2036',
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
    color: '#E4BBD0',
    fontSize: 16,
  },
  name: {
    marginBottom: 10,
    fontSize: 16,
    height: 50,
    color: '#E4BBD0',
  },
  actions: {
    paddingTop: 0,
    alignItems: 'center', // Centers the button horizontally
    justifyContent: 'center', // Centers the button vertically
  },
});

export default ProductCard;
