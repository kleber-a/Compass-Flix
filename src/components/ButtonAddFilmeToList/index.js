import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';


export default function ButtonAddFilmeToList({ setModalVisible, setButtonClickOn }) {
  
    return (
        <TouchableOpacity
            style={styles.containerOpenModal}
            onPress={() => {
                setModalVisible(true);
                setButtonClickOn(null);
            }}>
            <Icon style={styles.iconOpenModal} name="plus" size={25} />
            <Text style={styles.textOpenModal}>Adicionar a uma lista</Text>
        </TouchableOpacity>
    )
};

