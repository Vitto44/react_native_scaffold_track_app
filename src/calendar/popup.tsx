import React from 'react';
import { Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../../../styles';
import { PersonalInfoProps } from '../../data';
import PersonalInfoView from './personalData';

interface PersonalInfoPopupProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (data: PersonalInfoProps) => void;
}

const PersonalInfoPopup: React.FC<PersonalInfoPopupProps> = ({ isVisible, onClose, onSave }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <PersonalInfoView onClose={onClose} onSave={onSave} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
        </Modal>
    );
};

export default PersonalInfoPopup;
