import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../../../styles';
import { PersonalInfoProps } from '../../data';

interface PersonalInfoPopupProps {
    onClose: () => void;
    onSave: (data: PersonalInfoProps) => void;
}

const PersonalInfoView: React.FC<PersonalInfoPopupProps> = ({ onClose, onSave }) => {
    const [hourlyRate, setHourlyRate] = React.useState<string>("");


    return (
            <View style={styles.popupContainer}>
                <Text style={styles.mainHeading}>Personal Information</Text>

                <Text style={styles.popUpHeadings}>Hour Rate</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter Rate"
                    keyboardType="numeric"
                    onChangeText={setHourlyRate}
                    value={hourlyRate}
                />

                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => {
                        onSave({
                            hourlyRate: Number(hourlyRate),
                        });
                        onClose();
                    }}
                >
                    <Text style={styles.selectButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
    );
};

export default PersonalInfoView;
