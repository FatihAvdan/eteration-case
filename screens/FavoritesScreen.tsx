import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectFavoriteItems} from '../redux/slices/favoritesSlice';
import {fetchProducts, selectProducts} from '../redux/slices/productsSlice';
import {Product} from '../types/Product';
import ProductCard from './components/ProductCard';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const {products, status} = useSelector(selectProducts);
  const favorites = useSelector(selectFavoriteItems);

  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>(
    [],
  );
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const result = products.filter((product: Product) =>
      favorites.includes(product.id),
    );
    setDisplayedProducts(result);
  }, [products, favorites]);

  React.useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(displayedProducts);
    } else {
      const filtered = displayedProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, displayedProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
        onEndReachedThreshold={0.5}
        refreshing={status === 'loading'}
        onRefresh={() => {
          dispatch(fetchProducts() as any);
        }}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242B42',
  },
  searchbar: {
    margin: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
export default FavoritesScreen;
