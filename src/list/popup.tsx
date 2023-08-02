import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../../../styles';
import { Material } from '../../data';

type PopupProps = {
  isVisible: boolean;
  onClose: () => void;
  item: any;
  onSelect: (size: number, count: number) => void;
  list: Material[];
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, item, onSelect, list }) => {
  const [selectedSize, setSelectedSize] = useState<number>(0); // Default or first size from data.ts can be set
  const [count, setCount] = useState<string>("0");

  useEffect(() => {
    if (list.findIndex((i) => i.id === `${item.id}${selectedSize}`) !== -1) {
      setCount(list[list.findIndex((i) => i.id === `${item.id}${selectedSize}`)].count.toString())
    } else {
      setCount("0")
    }
  }, [selectedSize])

  const resetClose = () => {
    setSelectedSize(0);
    setCount("0");
    onClose();
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={resetClose}
    >
      <View style={styles.popupContainer}>
      <Text style={styles.mainHeading}>{item.name}</Text>
        {item.sizes && <Text style={styles.popUpHeadings}>Select size</Text>}
        
        <View style={styles.buttonContainer}>
        {item.sizes && item.sizes.map((size: number) => (
            <TouchableOpacity
                key={size}
                style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedButton
                ]}
                onPress={() => setSelectedSize(size)}
            >
                <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
        ))}
    </View>
        <Text style={styles.popUpHeadings}>Select count</Text>
          <View style={styles.flexRow}>
            <TouchableOpacity onPress={() => {
              parseInt(count) > 0 && setCount((parseInt(count) - 1).toString())
            }}>
              <Text style={{...styles.booleanSwitch,width: 100}}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Count"
              keyboardType="numeric"
              onChangeText = {(i)=> setCount(i)}
              value = {count}
            />

            <TouchableOpacity onPress={() => {
                setCount((parseInt(count) + 1).toString())
              }}>
                <Text style={{...styles.booleanSwitch,width: 100}}>+</Text>
              </TouchableOpacity>
          </View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            onSelect(selectedSize, parseInt(count));
            resetClose();
          }}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={resetClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default Popup;
