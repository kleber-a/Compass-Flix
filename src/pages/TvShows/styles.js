import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
    marginHorizontal: '5%',
    marginVertical: 5,
    backgroundColor: '#FFFFFF80',
    borderRadius: 5,
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderBottomColor: '#CCC',
    height: 42,
    alignItems: 'center',
  },
  active: {
    borderBottomColor: '#E9A6A6',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    justifyContent: 'center',
  },
  contentText: {
    height: 42,
    backgroundColor: '#FFFFFF80',
    borderRadius: 5,
    marginHorizontal: '5%',
    padding: 12,
    marginVertical: 5,
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  selectors: {
    marginBottom: 10,
    justifyContent: 'center',
  },
});

export default styles;
