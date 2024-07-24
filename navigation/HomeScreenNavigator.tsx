import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import {Button, Touchable, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {selectSelectedProduct} from '../redux/slices/selectedProductSlice';
import {Icon, IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

export default function HomeScreenNavigator() {
  const selectedProduct = useSelector(selectSelectedProduct);
  console.log('selectedProduct', selectedProduct);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue', // Header arka plan rengini burada değiştiriyoruz
        },
        headerTintColor: '#fff', // Header metin ve ikon rengini değiştiriyoruz
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({navigation}) => ({
          title: selectedProduct?.name,
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="white"
              size={36}
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
