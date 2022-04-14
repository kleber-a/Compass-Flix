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
  buttonSeason: {
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF80',
    borderRadius: 5,
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderBottomColor: '#CCC',
  },

  listContainerSeasons: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 5,
  },

  textSeasons: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  containerEpisodes: {
    alignContent: 'center',
    backgroundColor: '#FFFFFF80',
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },

  containerText: {
    height: 25,
  },

  textEpisode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },

  textTitleEpisode: {
    fontSize: 8,
    fontWeight: '400',
    color: '#fff',
  },
  //gfsag fdsg

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
    color: '#fff',
  },
  header: {
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  selectors: {
    marginBottom: 10,
    justifyContent: 'center',
    color: '#fff',
  },
  selector: {
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
    color: '#fff',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
    color: '#fff',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
    color: '#fff',
  },
});

export default styles;
