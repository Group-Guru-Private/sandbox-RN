import React from 'react'
import PaymentGateway from 'react-native-midtrans-payment';
import {View, Button} from 'react-native'
 
export default function Payment () {
  const pay = async () =>  {
    const optionConnect = {
      clientKey: "SB-Mid-client-tuHFsrsxohwXDvQ4",
      urlMerchant: "https://app.sandbox.midtrans.com/snap/v1/transactions", // will hit https://domain.net/charge
      sandbox : true, // works on iOS only, change it to false on production
    }

    const transRequest = {
      transactionId: "0001",
      totalAmount: 4000
    }

    const itemDetails = [
      {id: "001", price: 1000, qty: 4, name: "peanuts"}
    ];

    const creditCardOptions = {
      saveCard: false,
      saveToken: false,
      paymentMode: "Normal",
      secure: false
    };

    const userDetail = {
      fullName: "jhon",
      email: "jhon@payment.com",
      phoneNumber: "0850000000",
      userId: "U01",
      address: "street coffee",
      city: "yogyakarta",
      country: "IDN", // <-- must be standard country code
      zipCode: "59382"
    };

    const optionColorTheme = {
      primary: '#c51f1f',
      primaryDark: '#1a4794',
      secondary: '#1fce38'
    }

    const optionFont = {
      defaultText: "open_sans_regular.ttf",
      semiBoldText: "open_sans_semibold.ttf",
      boldText: "open_sans_bold.ttf"
   }

    const callback = (res) => {
      console.log(res)
    };

    PaymentGateway.checkOut(
      optionConnect,
      transRequest,
      itemDetails,
      creditCardOptions,
      userDetail,
      optionColorTheme,
      optionFont,
      callback
    );
  }

  return (
    <View>
      <Button title="Checkout" onPress={pay} />
    </View>
  )
}