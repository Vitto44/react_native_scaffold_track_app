import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "../../../styles";
import { Material } from "../../data";
import Icon from 'react-native-vector-icons/FontAwesome';

interface MaterialTabProps {
  searchValue: string;
  materials: Material[];
  handleAdd: (item: Material) => void;
}

const MaterialTab: React.FC<MaterialTabProps> = ({searchValue, materials, handleAdd}) => (
    <View style={styles.container}>
      <FlatList
        data={materials.filter(material => material.name.toLowerCase().includes(searchValue.toLowerCase()))}
        style={styles.materialList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.materialItem}>
            <Text style={{...styles.materialName, width: "auto"}}>{item.name}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );


export default MaterialTab;