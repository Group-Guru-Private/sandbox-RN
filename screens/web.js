import React, {useState, useEffect} from 'react'
import {WebView} from 'react-native-webview'
import axios from 'axios'
import {View, Text, ActivityIndicator} from 'react-native'
import {useNavigation} from '@react-navigation/native'
export default function WebScreen () {
  const [token, setToken] = useState('')
  const idOrder = 10
  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdHVkZW50MkBtYWlsLmNvbSIsImlhdCI6MTYxMTU2MzUzMH0.1kxt7vbpzaYD-tGaAcDzVtfU6GwZ0CYDcspCukURfno'
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchToken () {
      try {
        const getToken = await axios({
          method: 'PATCH',
          url: 'http://192.168.43.9:3000/orders/' + idOrder,
          headers: {
            access_token
          }
        })
        if (getToken) setToken(getToken.data.token)
      } catch(err) {
        console.log(err)
      }
    }
    fetchToken()
    // axios({
    //   method: 'PATCH',
    //   url: 'http://192.168.43.9:3000/orders/' + idOrder,
    //   headers: {
    //     access_token
    //   }
    // })
    //   .then(({ data }) => {
    //     // alert(data.token)
    //     setToken(data.token)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [])

  const webviewRef = React.useRef(null)

  const htmlContent = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Page</title>
        <script type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-tuHFsrsxohwXDvQ4">
        </script>
      </head>
      <body>
        <script type="text/javascript">
            snap.pay('${token}',
            {
              onSuccess: function(result){window.ReactNativeWebView.postMessage('success');},
              onPending: function(result){window.ReactNativeWebView.postMessage('pending');},
              onError: function(result){window.ReactNativeWebView.postMessage('error');},
              onClose: function(){window.ReactNativeWebView.postMessage('close');}
            }
            );
         </script>
      </body>
    </html>
  `
  const injectedJavaScript = `(function() {
      window.postMessage = function(data){
        window.ReactNativeWebView.postMessage(data);
      };
  })()`;
  function LoadingIndicatorView () {
    return(
      <ActivityIndicator 
        color="red"
        size="large"
        style={{ flex: 1, justifyContent: 'center' }}
      />
    )
  }
  const onMessage = (event) => {
    const { data } =  event.nativeEvent;
    alert(data)
    navigation.navigate('Home')
    // onCheckStatus(data)   
  }
  if (token) {
    return (
      <WebView 
        javaScriptEnabled={true}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ marginTop: 100 }}
        // injectedJavaScript={injectedJavaScript}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
        onMessage={onMessage}
        ref={webviewRef}
      />
    );
  } else return <View><Text>loading...</Text></View>

}