import {View, Text, Animated, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getTvShow, getTvShowSeason} from '../../service/api';
import styles from './styles';
import Loading from '../../components/Loading';
import IconTvShow from '../../components/IconTvShow';
import HeaderTvShows from '../../components/HeaderTvShows';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

export default function TvShows({route, navigation}) {
  const [id, type] = route.params;
  const [tvShow, setTvShow] = useState(null);
  const [season, setSeason] = useState(null);
  const [nameEpisode, setNameEpisode] = useState([]);
  const [nameSeason, setNameSeason] = useState([]);

  useEffect(() => {
    async function awaitGetTvShow() {
      try {
        const dataTvShow = await getTvShow(id);
        setTvShow(dataTvShow);
      } catch (error) {
        console.warn(error);
      }
    }

    awaitGetTvShow();
  }, [id]);

  async function awaitGetSeasonTvShow(seasonId) {
    try {
      const dataSeason = await getTvShowSeason(id, seasonId);
      console.warn(dataSeason.episodes);
      setNameEpisode(prevState => [...prevState, dataSeason.episodes.name]);
    } catch (error) {
      console.warn(error);
    }
  }

  // const renderItem = ({item, index}) => {
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={[
  //           styles.buttonSeason,
  //           selection &&
  //             index === currentIndex && {borderBottomColor: '#E9A6A6'},
  //         ]}
  //         onPress={() => {
  //           awaitGetSeasonTvShow(item.season_number);
  //           index !== currentIndex
  //             ? setSelection(true)
  //             : setSelection(!selection);
  //           setBodyHeight(new Animated.Value(-1000));
  //           setCurrentIndex(index);
  //         }}>
  //         <View style={styles.listContainerSeasons}>
  //           <Text style={styles.textSeasons}>{item.name}</Text>
  //           <IconTvShow loading={selection && index === currentIndex} />
  //         </View>
  //       </TouchableOpacity>
  //       <View style={{overflow: 'hidden'}}>
  //         {selection ? (
  //           <Animated.View style={{top: bodyHeight}}>
  //             {season &&
  //               season.season_number === item.season_number &&
  //               season.episodes.map((episode, index) => {
  //                 return (
  //                   <View style={styles.containerEpisodes} key={index}>
  //                     <View style={styles.containerText}>
  //                       <Text style={styles.textEpisode}>
  //                         T
  //                         {season.season_number < 10 && season.season_number > 0
  //                           ? '0' + season.season_number
  //                           : season.season_number}
  //                         | E
  //                         {episode.episode_number < 10
  //                           ? '0' + episode.episode_number
  //                           : episode.episode_number}
  //                       </Text>
  //                       <Text style={styles.textTitleEpisode}>
  //                         {episode.name}
  //                       </Text>
  //                     </View>
  //                   </View>
  //                 );
  //               })}
  //           </Animated.View>
  //         ) : null}
  //       </View>
  //     </View>
  //   );
  // };

  const CONTENT = [];

  // useEffect(() => {
  //   // nameSeason.map((item, index) => {
  //   //   CONTENT.push({
  //   //     title: item,
  //   //     content: nameEpisode[index],
  //   //   });
  //   // });
  //   console.warn(nameSeason);
  // }, [nameSeason]);

  if (tvShow) {
    const nameSeasonsTeeste = tvShow.seasons.map(item => {
      return item.name;
    });
    tvShow.seasons.forEach(item => {
      awaitGetSeasonTvShow(item.season_number);
    });

    nameSeasonsTeeste.forEach((element, index) => {
      CONTENT.push({
        title: element,
        // content: nameEpisode[index],
      });
    });
  }

  const ContainerSeasons = () => {
    const [activeSections, setActiveSections] = useState([]);
    const setSections = sections => {
      setActiveSections(sections.includes(undefined) ? [] : sections);
    };

    const renderHeader = (section, _, isActive) => {
      return (
        <Animatable.View
          duration={400}
          style={[styles.header, isActive ? styles.active : styles.inactive]}
          transition="slide">
          <Text style={styles.headerText}>{section.title}</Text>
        </Animatable.View>
      );
    };

    const renderContent = (section, _, isActive) => {
      return (
        <Animatable.View
          duration={400}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="slide">
          <Animatable.Text
            animation={isActive ? 'slide' : undefined}
            style={{textAlign: 'center', color: '#fff'}}>
            {section.content}
          </Animatable.Text>
        </Animatable.View>
      );
    };

    return (
      <ScrollView>
        <View style={styles.selectors}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        </View>
      </ScrollView>
    );
  };

  return tvShow ? (
    <View style={styles.container}>
      <HeaderTvShows
        navigate={navigation}
        type={type}
        id={id}
        tvShow={tvShow && tvShow}
      />
      <ContainerSeasons />
    </View>
  ) : (
    <View style={styles.containerLoading}>
      <Loading />
    </View>
  );
}
