import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import VerifyName from '../../User/VerifyName';

export default function FavoriteDescription({navigation, nameFavorite}) {
  return (
    <View style={styles.boxButtonAndText}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} color="black" />
      </TouchableOpacity>
      <Text style={styles.containerText}>
        {nameFavorite} do <VerifyName color={'pink'} />
      </Text>
    </View>
  );
}