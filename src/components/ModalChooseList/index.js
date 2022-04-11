import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './styles';



export default function ModalChooseList({ modalVisible, setModalVisible, modalVisibleSucess, renderItem, listId, movieId, sessionId, dataList, buttonClickOn, postMovieFavoriteList, setModalVisibleSucess }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.headerHender}>
                        <Text style={styles.textHeader}>Salvar filme em....</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Icon style={styles.iconClose} name="close" solid />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={dataList}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem}
                        contentContainerStyle={styles.containerFlatList}
                    />
                    <TouchableOpacity
                        style={
                            typeof buttonClickOn === 'number'
                                ? styles.buttonSave
                                : [styles.buttonSave, { backgroundColor: '#C4C4C4' }]
                        }
                        onPress={() => {
                            listId && postMovieFavoriteList(listId, sessionId, { "media_id": movieId })
                            typeof buttonClickOn === 'number' &&
                                setModalVisibleSucess(!modalVisibleSucess);
                            typeof buttonClickOn === 'number' &&
                                setModalVisible(!modalVisible)

                        }}>
                        <Text
                            style={
                                typeof buttonClickOn === 'number'
                                    ? styles.textStyleSave
                                    : [styles.textStyleSave, { color: '#8E8E8E' }]
                            }>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
};