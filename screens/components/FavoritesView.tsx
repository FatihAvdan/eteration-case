import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {
  addToFavoriteItems,
  removeFavoriteItem,
  selectFavoriteItems,
  saveFavoritesToStorage,
} from '../../redux/slices/favoritesSlice';
import {useDispatch, useSelector} from 'react-redux';

const FavoritesView = ({id}: {id: string}) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);
  const isFavorite = favoriteItems.some(fav => fav === id);
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteItem(id));
      const updatedItems = favoriteItems.filter(fav => fav !== id);
      dispatch(saveFavoritesToStorage(updatedItems) as any);
    } else {
      dispatch(addToFavoriteItems(id));
      dispatch(saveFavoritesToStorage([...favoriteItems, id]) as any);
    }
  };

  return (
    <View style={styles.iconButtonContainer}>
      <IconButton
        icon={isFavorite ? 'star' : 'star-outline'}
        iconColor={isFavorite ? 'yellow' : 'yellow'}
        size={24}
        onPress={() => handleToggleFavorite()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 10,
    zIndex: 1,
  },
});

export default FavoritesView;
