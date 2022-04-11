import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { getList, postMovieFavoriteList } from '../../service/api'
import { AuthContext } from '../../context/auth'
import ButtonAddFilmeToList from '../../components/ButtonAddFilmeToList';
import ButtonModalOk from '../ButtonModalOk';
import ModalChooseList from '../ModalChooseList';

export default function ModalFavoriteList({ navigation, movieId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSucess, setModalVisibleSucess] = useState(false);
  const [buttonClickOn, setButtonClickOn] = useState(null);
  const { account, sessionId } = useContext(AuthContext);
  const [dataList, setDataList] = useState(null)
  const [listId, setListId] = useState(null)

  async function awaitGetList() {
    const list = await getList(account.id, sessionId, '1')
    setDataList(list.results)
  }
  useEffect(() => {
    navigation.addListener('focus', () => {
      awaitGetList()
    });
  }, [navigation])

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.containerRenderItem}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setButtonClickOn(index);
            setListId(item.id)
          }}
          style={styles.buttonClick}>
          <View style={buttonClickOn === index && styles.buttonClickOn} />
        </TouchableOpacity>
        <Text style={styles.TextFlatList}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <ButtonModalOk
        modalVisibleSucess={modalVisibleSucess}
        setModalVisibleSucess={setModalVisibleSucess}
      />
      <ModalChooseList
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setModalVisibleSucess={setModalVisibleSucess}
        dataList={dataList && dataList}
        renderItem={renderItem}
        buttonClickOn={buttonClickOn}
        listId={listId}
        sessionId={sessionId}
        movieId={movieId}
        postMovieFavoriteList={postMovieFavoriteList}

      />
      <ButtonAddFilmeToList
        setModalVisible={setModalVisible}
        setButtonClickOn={setButtonClickOn}
      />
    </View >
  );
}
