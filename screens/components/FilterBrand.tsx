import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Checkbox, Divider, RadioButton, Searchbar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {selectBrands} from '../../redux/slices/productsSlice';
import {selectFilter, setFilterBrand} from '../../redux/slices/filterSlice';

const FilterBrand = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  const removedDuplicates = brands.filter(
    (brand: string, index: number) => brands.indexOf(brand) === index,
  );
  const filter = useSelector(selectFilter);
  const selectedBrands = filter.brand;

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    dispatch(setFilterBrand(newBrands));
    console.log(newBrands);
  };
  const isSelected = (brand: string) => selectedBrands.includes(brand);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredBrands, setFilteredBrands] = React.useState(removedDuplicates);

  React.useEffect(() => {
    if (searchQuery === '') {
      setFilteredBrands(removedDuplicates);
    } else {
      const filtered = removedDuplicates.filter((brand: string) =>
        brand.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBrands(filtered);
    }
  }, [searchQuery, brands]);

  const singleBrand = (brand: string) => {
    return (
      <View
        key={brand}
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Checkbox
          status={isSelected(brand) ? 'checked' : 'unchecked'}
          onPress={() => {
            toggleBrand(brand);
          }}
        />
        <Text
          style={{color: 'white'}}
          onPress={() => {
            toggleBrand(brand);
          }}>
          {brand}
        </Text>
      </View>
    );
  };
  return (
    <View style={{margin: 10, maxHeight: 250}}>
      <Text style={{color: 'white'}}>Brand</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          marginTop: 10,
          marginBottom: 10,

          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          justifyContent: 'center',
        }}
        inputStyle={{
          flex: 1,
          height: 40,
          justifyContent: 'center',
          marginHorizontal: -10,
          marginVertical: -10,
        }}
      />
      <ScrollView style={{height: '100%'}} nestedScrollEnabled={true}>
        {filteredBrands.map((brand: string) => singleBrand(brand))}
      </ScrollView>
      <Divider />
    </View>
  );
};

export default FilterBrand;
