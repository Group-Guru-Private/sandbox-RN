import React from 'react'
import {WebView} from 'react-native-webview'
import sandbox from './sandbox.html'

export default function Web () {
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
        <button id="pay-button">Pay!</button>
        <script type="text/javascript">
          var payButton = document.getElementById('pay-button');
          payButton.addEventListener('click', function () {
            snap.pay('2bc5fbf0-7c8e-4e73-9ea4-400ad2d413a5');
          });
        </script>
      </body>
    </html>
  `
  const injectedJavaScript = `(function() {
      window.postMessage = function(data){
          window.ReactNativeWebView.postMessage(data);
      };
  })()`;

  const onMessage = (event) => {
    const { data } =  event.nativeEvent;
    console.log(data)
    // onCheckStatus(data)
  }

  return (
    <WebView 
      javaScriptEnabled={true}
      // style={{ flex: 1 }}
      originWhitelist={['*']}
      // source={{ html: htmlContent }}
      source={{ html: htmlContent }}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  )
}