import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Checkbox, Divider, RadioButton, Searchbar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {selectModels} from '../../redux/slices/productsSlice';
import {selectFilter, setFilterModel} from '../../redux/slices/filterSlice';

const FilterModel = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels);

  const removedDuplicates = models.filter(
    (model: string, index: number) => models.indexOf(model) === index,
  );
  const filter = useSelector(selectFilter);
  const selectedModels = filter.model;

  const toggleModel = (model: string) => {
    const newModels = selectedModels.includes(model)
      ? selectedModels.filter(b => b !== model)
      : [...selectedModels, model];
    dispatch(setFilterModel(newModels));
    console.log(newModels);
  };
  const isSelected = (model: string) => selectedModels.includes(model);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredModels, setFilteredModels] = React.useState(removedDuplicates);

  React.useEffect(() => {
    if (searchQuery === '') {
      setFilteredModels(removedDuplicates);
    } else {
      const filtered = removedDuplicates.filter((model: string) =>
        model.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredModels(filtered);
    }
  }, [searchQuery, models]);

  const singleModel = (model: string) => {
    return (
      <View
        key={model}
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Checkbox
          status={isSelected(model) ? 'checked' : 'unchecked'}
          onPress={() => {
            toggleModel(model);
          }}
        />
        <Text
          style={{color: 'white'}}
          onPress={() => {
            toggleModel(model);
          }}>
          {model}
        </Text>
      </View>
    );
  };
  return (
    <View style={{margin: 10, maxHeight: 250}}>
      <Text style={{color: 'white'}}>Model</Text>
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
        {filteredModels.map((model: string) => singleModel(model))}
      </ScrollView>
      <Divider />
    </View>
  );
};

export default FilterModel;
