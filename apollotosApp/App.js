import React from 'react'
import { useEffect, useRef } from 'react'
import { BackHandler, Platform, SafeAreaView, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'
import { RootSiblingParent } from 'react-native-root-siblings'

export default function App() {
  const webviewRef = useRef()
  let lastBackPressed = 0
  const now = +new Date()

  // 退出
  useEffect(() => {
    console.log('currentHeight', StatusBar.currentHeight)
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (lastBackPressed && lastBackPressed + 2000 >= +new Date()) {
        BackHandler.exitApp()
        return false
      }
      lastBackPressed = +new Date()
      webviewRef.current.goBack()
      return true
    })
    return () => {
      BackHandler.removeEventListener('hardwareBackPress')
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <WebView
          ref={webviewRef}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode={'always'}
          originWhitelist={['*']}
          useWebkit
          source={{ uri: `http://192.168.2.210:8000/?t=${String(now).slice(0, 8)}`}}
        ></WebView>
      </RootSiblingParent>
    </SafeAreaView>
  )
}