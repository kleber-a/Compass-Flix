import {StyleSheet} from 'react-native';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  textFavoritesTvShow: {
    color: '#ffffff',
    fontFamily: 'open sans',
    fontSize: 20,
    fontWeight:'bold',
  },
  boxHeader: {
    height: 70,
    width: '100%',
    marginVertical: '4%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  Image: {
    height: 95,
    width: 76,
    justifyContent: 'center',
  },
  boxImage: {
    alignContent:"center",
    justifyContent:"space-evenly",
    width: 86,
    marginHorizontal:"2%",
    marginTop:10,
    
  },
});

export default styles;