import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './styles'
export default function ButtonModalOk({ modalVisibleSucess, setModalVisibleSucess }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleSucess}
            onRequestClose={
                () => {
                    setModalVisibleSucess(!modalVisibleSucess);
                }
            }>
            <View style={styles.modalSucessBackground}>
                <View style={styles.modalSucess}>
                    <Icon name="checkcircleo" size={25} color="#000000" />
                    <Text style={styles.textModalSucess}>
                        Lista atualizada com sucesso!
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonModalSucess}
                        onPress={() => setModalVisibleSucess(!modalVisibleSucess)}>
                        <Text style={styles.textStyleSave}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
};