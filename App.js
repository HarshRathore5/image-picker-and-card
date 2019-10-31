import React from 'react'
import {SafeAreaView} from 'react-native'
import Networking from './Task/networking'
import Card from './Task/card'
import CropImage from './Task/cropImage'
export default class App extends React.Component{
  render(){
    return(
      // <React.Fragment>
        <Card/>
      // </React.Fragment>
      // <CropImage/>
    )
  }
}