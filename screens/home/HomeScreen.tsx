import * as React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {ActivityIndicator, StyleSheet} from 'react-native';
import ProductCard from './components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {
  fetchProducts,
  loadMoreDisplayedProducts,
  selectProducts,
} from '../../redux/slices/productsSlice';
import {useCallback, useEffect} from 'react';
export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const dispatch = useDispatch();
  const handleRefresh = useCallback(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);
  const {displayedProducts, status, hasMore} = useSelector(selectProducts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, status]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && status !== 'loading') {
      dispatch(loadMoreDisplayedProducts());
    }
  }, [dispatch, hasMore, status]);

  if (status === 'loading' && displayedProducts.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === 'failed') {
    return <Text>Error fetching products</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedProducts}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
        onRefresh={handleRefresh}
        refreshing={status === 'loading' && displayedProducts.length > 0}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        columnWrapperStyle={styles.columnWrapper} // Style for columns
        ListFooterComponent={
          status === 'loading' ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
