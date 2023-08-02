import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput } from 'react-native';
import styles from '../../../styles';
import { Material, materials } from '../../data';
import Popup from './popup';
import { TabView, TabBar } from 'react-native-tab-view';
import MaterialTab from './materialTab';
import PickUpTab from './pickupTab';

const LIST_STORAGE_KEY = 'LIST_STORAGE_KEY';

const ListScreen: React.FC = () => {
  const [pickupList, setPickupList] = useState([] as Material[]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Material | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // Load pickupList from AsyncStorage
  useEffect(() => {
    const loadPickupList = async () => {
      const savedPickupList = await AsyncStorage.getItem(LIST_STORAGE_KEY);
      if (savedPickupList) {
        setPickupList(JSON.parse(savedPickupList));
      }
    };

    loadPickupList();
  }, []);

  // For TabView
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'materials', title: 'Materials' },
    { key: 'pickup', title: 'Pickup List' },
  ]);

  const addToPickup = (item: Material) => {
    if (item.count === 0) return;
    const newPickupList = [...pickupList, item];
    //Save localy
    AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(newPickupList));
    setPickupList(newPickupList);
  };

  const removeFromPickup = (id: string) => {
    setPickupList(pickupList.filter(item => item.id !== id));
  };

  const deleteAll = () => {
    setPickupList([]);
  };

  const handleAdd = (item: Material) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };
  
  const handleSelect = (size: number, count: number) => {
    if (selectedItem && selectedItem.id !== undefined) {
      // check if item already exists in pickup list
      const existingItem = pickupList.find(item => item.id === (selectedItem.id + size));
      if (existingItem) {
        // if it does, add the count to the existing item
        existingItem.count = count;
        setPickupList([...pickupList]);
        //Save localy
        AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(pickupList));
        return;
      }
      // if it doesn't, add it to the pickup list
      const updatedItem = { ...selectedItem, size, count, id: (selectedItem.id + size) };
      addToPickup(updatedItem);
    } else {
      console.error("No item selected");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search..." onChangeText={setSearchValue} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'materials':
              return <MaterialTab searchValue={searchValue} materials={materials} handleAdd={handleAdd} />;
            case 'pickup':
              return <PickUpTab searchValue={searchValue} deleteAll={deleteAll} pickupList={pickupList} removeFromPickup={removeFromPickup}/>;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: parseInt('100%') }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#fff' }}
            style={{ backgroundColor: '#00bbf2' }}
          />
        )}
      />
      {selectedItem &&
        <Popup
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
          item={selectedItem}
          onSelect={handleSelect}
          list={pickupList}
        />
      }
    </View>
  );
};

export default ListScreen;
