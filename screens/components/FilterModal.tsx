import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  IconButton,
  Checkbox,
  RadioButton,
  Divider,
} from 'react-native-paper';
import FilterSort from './FilterSort';
import FilterBrand from './FilterBrand';
import FilterModel from './FilterModel';
const FilterModal = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const [checked, setChecked] = React.useState('oldToNew');

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}>
      <ScrollView style={styles.content} nestedScrollEnabled={true}>
        <View style={styles.header}>
          <IconButton
            icon="close"
            size={30}
            iconColor="white"
            onPress={onDismiss}
            style={styles.iconButton}
          />
          <Text style={styles.headerText}>Filter</Text>
        </View>
        <View style={styles.body}>
          <FilterSort />
          <FilterBrand />
          <FilterModel />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    backgroundColor: '#242B42',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#242B42',
    borderBottomWidth: 1,
    borderColor: '#966AFE',
    flexDirection: 'row',
    justifyContent: 'center', // Ortalamak için
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    left: 10, // Sol tarafta
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  filterSection: {
    margin: 10,
  },
});
export default FilterModal;
