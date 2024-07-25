import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectSelectedProduct} from '../redux/slices/selectedProductSlice';
import {Card, Text} from 'react-native-paper';
import FavoritesView from './components/FavoritesView';
import CartButton from './components/CartButton';
export default function ProductDetailsScreen() {
  const selectedProduct = useSelector(selectSelectedProduct);

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
          <FavoritesView id={selectedProduct.id.toString()} />
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
        </View>
        <CartButton product={selectedProduct} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#242B42',
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1A2036',
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
    color: 'pink',
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
    color: 'pink',
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
    backgroundColor: 'grey', // Button'un arkaplan rengi
    borderTopWidth: 1,
    borderColor: '#ccc', // Border rengi
    alignItems: 'center',
  },
});
