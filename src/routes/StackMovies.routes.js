import React from 'react';
import Movies from '../pages/Movies';
import HomeMovies from '../pages/HomeMovies';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackMovies() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeMovies" component={HomeMovies} />
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
  );
}

export default StackMovies;