import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator, Searchbar, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProducts,
  loadMoreDisplayedProducts,
  selectProducts,
} from '../redux/slices/productsSlice';
import ProductCard from './components/ProductCard';
import FilterModal from './components/FilterModal';
import {selectFilter} from '../redux/slices/filterSlice';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(fetchProducts() as any);
  };

  const {displayedProducts, status, hasMore} = useSelector(selectProducts);
  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, status]);

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      dispatch(loadMoreDisplayedProducts());
    }
  };
  // Search
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter
  const [isModalVisible, setModalVisible] = React.useState(false);
  const filter = useSelector(selectFilter);
  const [filteredProducts, setFilteredProducts] =
    React.useState(displayedProducts);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigation.setOptions({headerShown: isModalVisible});
  };

  React.useEffect(() => {
    let result = displayedProducts;

    // Apply model and brand filters
    result = result.filter(product => {
      return (
        (filter.model.length === 0 || filter.model.includes(product.model)) &&
        (filter.brand.length === 0 || filter.brand.includes(product.brand))
      );
    });

    // Apply search filter
    if (searchQuery !== '') {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    if (filter.sort === 'oldToNew') {
      result = result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (filter.sort === 'newToOld') {
      result = result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (filter.sort === 'lowToHigh') {
      result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filter.sort === 'highToLow') {
      result = result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(result);
  }, [searchQuery, displayedProducts, filter]);

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
        <Button mode="contained" icon={'filter'} onPress={toggleModal}>
          Filter
        </Button>
      </View>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
        onRefresh={handleRefresh}
        refreshing={status === 'loading' && displayedProducts.length > 0}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        columnWrapperStyle={styles.columnWrapper} // Style for columns
        ListFooterComponent={
          status === 'loading' ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
      <FilterModal visible={isModalVisible} onDismiss={toggleModal} />
    </View>
  );
}

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
