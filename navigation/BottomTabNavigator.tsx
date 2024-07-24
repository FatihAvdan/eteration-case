import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreenNavigator from './HomeScreenNavigator';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserScreen from '../screens/UserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';

import {selectCartItemLenght} from '../redux/slices/cartSlice';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // const cartItemCount = useSelector(state => state.cart);
  const cartItemCount = useSelector(selectCartItemLenght);

  console.log('cartItemCount', cartItemCount);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue', // Header arka plan rengini burada değiştiriyoruz
        },
        headerTintColor: '#fff', // Header metin ve ikon rengini değiştiriyoruz
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          // marginTop: 10, // Padding top eklemek için
        },
        tabBarActiveTintColor: 'white', // Aktif tab rengi
        tabBarInactiveTintColor: 'gray', // Pasif tab rengi
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={'black'}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="basket-outline"
                color={'black'}
                size={36}
              />
              {cartItemCount > 0 && (
                <Badge style={styles.badge} size={22}>
                  {cartItemCount}
                </Badge>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="star-outline"
              color={'black'}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={'black'}
              size={36}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
});
