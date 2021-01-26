import React from 'react'
import {View, Text, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function Home () {
  const navigation = useNavigation()
  const goWeb = () => {
    navigation.navigate('WebScreen')
  }
  const goMap = () => {
    navigation.navigate('MapPage')
  }
  return (
    <View>
      <Text>Ini home</Text>
      <Button title="Go Web" onPress={goWeb} />
      <Button title="Go Map" onPress={goMap} />
    </View>
  )
}