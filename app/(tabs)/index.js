import {StatusBar} from 'react-native';
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';

import Routes from '../src/routes/routes'
import AuthProvider from '../src/contexts/auth';

export default function App(){
  return(
    
      <AuthProvider>
      <StatusBar backgroundColor="#f0f4ff" barStyle="dark-content"/>
      <Routes/>
      </AuthProvider>
  )
}