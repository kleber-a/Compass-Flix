import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getIdAccessToken,
  getRequestToken,
  validateToken,
} from '../../service/api';
import styles from './styles';

export default function Login({navigation}) {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isSuccess, setIsSuccess] = useState(null);

  const user = {
    username: username,
    password: password,
    request_token: token,
  };

  useEffect(() => {
    async function awaitGetToken() {
      try {
        const requestTolken = await getRequestToken();
        setToken(requestTolken);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    awaitGetToken();
  }, []);

  async function isSucess(userFull) {
    try {
      const isSuccessRequest = await validateToken(userFull);
      const sessionId = await getIdAccessToken({request_token: token});
      setIsSuccess(isSuccessRequest);
      AsyncStorage.multiSet([
        ['@CodeApi:username', username],
        ['@CodeApi:token', token],
        ['@CodeApi:session', sessionId],
      ]);
      if (isSuccessRequest) {
        return navigation.reset({
          index: 0,
          routes: [{name: 'HomeTabScreen'}],
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  const [bottom, setBottom] = useState(new Animated.Value(800));
  Animated.timing(bottom, {
    toValue: 0,
    duration: 1000,
  }).start();
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View>
        <Image
          style={styles.banner}
          source={require('../../assets/bannerLogin.png')}
        />
        <Animated.Image
          style={{
            bottom: bottom,
            height: 130,
            resizeMode: 'cover',
            alignSelf: 'center',
            position: 'absolute',
          }}
          source={require('../../assets/logo.png')}
        />
      </View>
      <Animated.View
        style={{
          top: bottom,
        }}>
        <View style={styles.textEntry}>
          <Text style={styles.textEntry.login}>Login</Text>
          <Text style={styles.textEntry.description}>
            Entre na sua conta para continuar.
          </Text>
        </View>
        <View style={styles.inputArea}>
          <EvilIcons
            style={styles.userIcon}
            name="user"
            color="#fff"
            size={20}
          />
          <TextInput
            keyboardType={'email-address'}
            autoComplete={'email'}
            style={styles.input}
            placeholder="e-mail"
            onChangeText={usernameInput => {
              setUsername(usernameInput);
            }}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
          <AntDesign
            style={styles.lockIcon}
            name="lock"
            color="#fff"
            size={18}
          />
          <TextInput
            onChangeText={passwordInput => {
              setPassword(passwordInput);
            }}
            autoComplete={'password'}
            style={styles.input}
            placeholder="senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnSubmit}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              isSucess(user);
            }}>
            <Text style={styles.btnSubmit.text}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
