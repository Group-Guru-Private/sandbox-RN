import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context'
import {WebView} from 'react-native-webview'
import axios from 'axios'
import Home from './screens/Home'
import WebScreen from './screens/web'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MapPage from './screens/MapPage'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={Home}
        />
        <Stack.Screen 
          name="WebScreen"
          component={WebScreen}
        />
        <Stack.Screen 
          name="MapPage"
          component={MapPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
