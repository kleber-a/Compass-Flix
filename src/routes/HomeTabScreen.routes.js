import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ButtonHome from '../components/TabButtons/ButtonHome';
import ButtonPlay from '../components/TabButtons/ButtonPlay';
import ButtonUser from '../components/TabButtons/ButtonUser';
import StackMovies from './StackMovies.routes';
import StackTvShows from './StackTvShos.routes';
import FavoriteMovies from '../pages/FavoriteMovies';
const Tab = createBottomTabNavigator();

function HomeTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="StackMovies"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#304FFE',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#454545',
          borderTopColor: 'transparent',
          height: 54,
        },
      }}>
      <Tab.Screen
        name="StackTvShows"
        component={StackTvShows}
        options={{
          tabBarIcon: () => <ButtonPlay name="StackTvShows" />,
        }}
      />
      <Tab.Screen
        name="StackMovies"
        component={StackMovies}
        options={{
          tabBarIcon: () => <ButtonHome name="StackMovies" />,
        }}
      />
      <Tab.Screen
        name="FavoriteMovies"
        component={FavoriteMovies}
        options={{
          tabBarIcon: () => <ButtonUser name="User" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabScreen;
