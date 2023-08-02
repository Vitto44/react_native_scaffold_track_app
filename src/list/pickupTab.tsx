import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Material } from "../../data";
import styles from "../../../styles";
import Icon from 'react-native-vector-icons/FontAwesome';

interface PickUpTabProps {
  searchValue: string;
  pickupList: Material[];
  deleteAll: () => void;
  removeFromPickup: (id: string) => void;
}

const PickUpTab: React.FC<PickUpTabProps> = ({searchValue, deleteAll, pickupList, removeFromPickup}) => (
  <View style={styles.container}>
  <View style={styles.materialItem}>
    <Text style={styles.materialName}>Name</Text>
    <Text style={styles.infoText}>Size</Text>
    <Text style={styles.infoText}>Count</Text>
    <TouchableOpacity style={styles.deleteButton} onPress={deleteAll}>
      <Text style={styles.addButtonText}> Clear </Text>
    </TouchableOpacity>
  </View>
  <FlatList
    data={pickupList.filter(material => material.name.toLowerCase().includes(searchValue.toLowerCase()))}
    style={styles.materialList}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.materialItem}>
        <Text style={styles.materialName}>{item.name}</Text>
        <Text style={styles.infoText}>{item.size? item.size: "-"}</Text>
        <Text style={styles.infoText}>{item.count}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromPickup(`${item.id}`)}>
          <Icon name="trash" size={40} color="#900" />
        </TouchableOpacity>
      </View>
    )}
  />
</View>
  );


export default PickUpTab;