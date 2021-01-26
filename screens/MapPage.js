import React, {useEffect, useState} from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

export default function MapPage () {
  const aspectRatio = width / height
  const latitudeDelta = 0.0922
  const longitudeDelta = latitudeDelta * aspectRatio
  
  const initPosition = {
    latitude: 0,
    longitude: 0,
    latitudeDelta,
    longitudeDelta
  }
  const space = 0.01
  const [position, setPosition] = useState(initPosition)
  const [stateA, setStateA] = useState({
    latitude: position.latitude + space,
    longitude: position.longitude + space
  })
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(currentPosition => {
      const {latitude, longitude} = currentPosition.coords
      // alert(JSON.stringify(currentPosition))
      setPosition({
        ...position,
        latitude,
        longitude
      })
    }, error => alert(error.message), { timeout: 5000, maximumAge: 1000 })
  }, [])

  const changePosition = (e) => {
    // alert(JSON.stringify(e.nativeEvent.coordinate))
    const spaceLat = e.nativeEvent.coordinate.latitude
    const spaceLon = e.nativeEvent.coordinate.longitude
    const latitude = position.latitude + spaceLat
    const longitude = position.longitude + spaceLon
    setPosition({
      ...position,
      latitude,
      longitude
    })
    alert(latitude)
    alert(longitude)
  }

  return (
    <MapView 
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={position}
    >
      <Marker 
        coordinate={stateA}
        // onSelect={e => console.log('onSelect', e)}
        // onDrag={e => console.log('onDrag', e)}
        // onDragStart={e => console.log('onDragStart', e)}
        // onDragEnd={e => console.log('onDragEnd', e.nativeEvent.coordinate)}
        // onPress={e => console.log('onPress', e.nativeEvent.coordinate)}
        // onDrag={changePosition}
        onDragEnd={changePosition}
        draggable
      />
    </MapView>
  )

}