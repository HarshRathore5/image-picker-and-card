import React from 'react';
import {View, Image,StyleSheet} from 'react-native';
export const LoadImage = (props) => {
    let sourceurl=props.item.avatar
  onLoadImage=()=>{
    sourceurl='https://tse1.mm.bing.net/th?id=OIP.P52a9pxl4VBllILeaSV3qADLEy&pid=Api'
    console.warn("LoadOut");
    
  }
  return(
   <Image 
   onLoad={()=>onLoadImage()}
   style={Styles.imgStyle}
   source={{uri: sourceurl}}/>
  )
};

const Styles=StyleSheet.create({
    imgStyle: {
        width: 100,
        height: 100,
        margin: 15,
      },
})