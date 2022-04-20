import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import styles from './styles';
import ButtonReturn from '../../components/ButtonReturn';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../context/auth';
import { addList, getList, deletList } from '../../service/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../components/Loading';
import ModalDelete from '../../components/ModalDelete/indexlista';

const windowWidth = Dimensions.get('window').width;

export default function MyLists({ navigation }) {
  const { account, sessionId } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState('1');
  const [dataList, setDataList] = useState();
  const [listSucess, setListSucess] = useState(false);
  const [modalVisibleSucess, setModalVisibleSucess] = useState(false);
  const [idList, setIdList] = useState();

  if (listSucess) {
    setTimeout(() => {
      setListSucess(false);
    }, 3000);
  }
  const [list, setList] = useState({
    name: name,
    description: description,
    language: 'pt',
  });

  async function awaitList() {
    const awaitlist = await getList(account.id, sessionId, page);
    setDataList(awaitlist.results);
  }

  useEffect(() => {
    awaitList();
  }, [modalVisible]);

  async function postList(list, sessionId) {
    const sucess = await addList(list, sessionId);
    if (sucess.success === true) {
      setName('');
      setDescription('');
      setModalVisible(false);
    } else {
      Alert.alert('Algo deu errado', 'Tente Novamente');
    }
  }

  const [slideAnim, setSlideAnim] = useState(
    new Animated.Value(0 - windowWidth),
  );

  // const openSuccess = () => {
  Animated.timing(slideAnim, {
    toValue: windowWidth * 0.05,
    duration: 1000,
    Easing: Easing.linear,
    useNativeDriver: false,
  }).start();
  // };

  return (
    <View style={styles.container}>
      <ButtonReturn navigation={navigation} />
      <View style={styles.boxText}>
        <Text style={styles.text}>Minhas listas</Text>
      </View>
      <ModalDelete
        setModalVisibleSucess={setModalVisibleSucess}
        modalVisibleSucess={modalVisibleSucess}
        sessionId={sessionId}
        itemId={idList}
        awaitList={awaitList}
      />
      <View style={styles.containerLista}>
        {dataList ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            {dataList &&
              dataList.map(item => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ListMovies', [item.id])}
                  key={item.id}
                  style={styles.boxLista}>
                  <View style={styles.boxDescription}>
                    <Text style={styles.nameList}>
                      {item.name.toUpperCase()}
                    </Text>
                    <Text style={styles.numberMovies}>
                      {item.item_count > 1 ? `${item.item_count} FILMES` : `${item.item_count} FILME`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisibleSucess(!modalVisibleSucess);
                      setIdList(item.id);
                    }}
                    style={styles.del}>
                    <AntDesign name="delete" color="#EC2626" size={14} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : (
          <View style={styles.containerLoading}>
            <Loading />
          </View>
        )}

        {listSucess && !modalVisible && (
          <Animated.View style={[styles.containerAnimated, { left: slideAnim }]}>
            <View style={styles.boxAnimated}>
              <MaterialIcons
                style={styles.Icon}
                name="done"
                size={20}
                color={'#1ed92b'}
              />
              <Text style={styles.textAnimated}>Lista criada</Text>
            </View>
          </Animated.View>
        )}
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}>
        <Entypo name="plus" color="#FFFFFF" size={38} />
      </TouchableOpacity>
      <View style={styles.viewplus}>
        <Modal
          style={{ alignItems: 'center', justifyContent: 'center' }}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.backgroundModal}>
            <View style={styles.containerModal}>
              <View style={styles.boxTextModal}>
                <Text style={styles.textModal}>Nova lista</Text>
              </View>
              <TextInput
                maxLength={45}
                style={styles.nameListModal}
                placeholder={'Nome da Lista'}
                value={name}
                placeholderTextColor={'rgba(142, 142, 142, 0.5)'}
                onChangeText={text => setName(text)}
              />
              <TextInput
                maxLength={220}
                style={styles.descriptionListModal}
                placeholder={'Descrição'}
                value={description}
                textAlignVertical={'top'}
                multiline={true}
                placeholderTextColor={'rgba(142, 142, 142, 0.5)'}
                onChangeText={text => setDescription(text)}
              />
              <View style={styles.boxButtonModal}>
                <TouchableOpacity
                  style={styles.buttonCancelModal}
                  onPress={() => [
                    setModalVisible(false),
                    setName(''),
                    setDescription(''),
                  ]}>
                  <Text style={styles.textButtonModal}>CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonSaveModal,
                    name !== ''
                      ? { backgroundColor: 'black' }
                      : { backgroundColor: '#C4C4C4' },
                  ]}
                  disabled={name === ''}
                  onPress={() => {
                    setSlideAnim(new Animated.Value(0 - windowWidth));
                    // openSuccess();
                    setListSucess(true);
                    postList(
                      {
                        name: name,
                        description: description,
                        language: 'pt',
                      },
                      sessionId,
                    );
                  }}>
                  <Text
                    style={[
                      styles.textButtonModal,
                      name !== '' ? { color: 'white' } : { color: '#8E8E8E' },
                    ]}>
                    SALVAR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
