import React from 'react';
import Home from '../../components/Home';

export default function HomeMovies({navigation}) {
  return <Home type={{movie: 'Filmes'}} navigate={navigation} />;
}
