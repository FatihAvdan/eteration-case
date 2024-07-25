import {View, Text} from 'react-native';
import React from 'react';
import {Divider, RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setFilterSort, selectFilter} from '../../redux/slices/filterSlice';
const FilterSort = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sort = filter.sort;
  const toggleSort = (sort: string) => {
    dispatch(setFilterSort(sort));
  };
  return (
    <View style={{margin: 10}}>
      <Text style={{color: 'white'}}>Sort By</Text>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <RadioButton
            value="oldToNew"
            status={sort === 'oldToNew' ? 'checked' : 'unchecked'}
            onPress={() => toggleSort('oldToNew')}
          />
          <Text style={{color: 'white'}} onPress={() => toggleSort('oldToNew')}>
            Old to new
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <RadioButton
            value="newToOld"
            status={sort === 'newToOld' ? 'checked' : 'unchecked'}
            onPress={() => toggleSort('newToOld')}
          />
          <Text style={{color: 'white'}} onPress={() => toggleSort('newToOld')}>
            New to Old
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <RadioButton
            value="highToLow"
            status={sort === 'highToLow' ? 'checked' : 'unchecked'}
            onPress={() => toggleSort('highToLow')}
          />
          <Text
            style={{color: 'white'}}
            onPress={() => toggleSort('highToLow')}>
            Price hight to low
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <RadioButton
            value="lowToHigh"
            status={sort === 'lowToHigh' ? 'checked' : 'unchecked'}
            onPress={() => toggleSort('lowToHigh')}
          />
          <Text
            style={{color: 'white'}}
            onPress={() => toggleSort('lowToHigh')}>
            Price low to high
          </Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default FilterSort;
