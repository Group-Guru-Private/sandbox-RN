import React from 'react'
import {WebView} from 'react-native-webview'

export default function web () {
  return (
    <WebView 
      source={{ html: '<h1>Hello World</h1>' }}
      style={{ marginTop: 100 }}
    />
  )
}