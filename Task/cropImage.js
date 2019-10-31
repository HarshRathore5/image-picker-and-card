import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class CropImage extends React.Component {
  constructor() {
    super();
    this.state = {
      sourceImage:
        'https://tse3.mm.bing.net/th?id=OIP.0KIQ-UTdpUIr8kUWz5kVYgHaE8&pid=Api',
      sourceCamera: 'https://tse3.mm.bing.net/th?id=OIP.0KIQ-UTdpUIr8kUWz5kVYgHaE8&pid=Api',
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={Styles.imgViewStyle}
          onPress={() =>
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              this.setState({
                sourceImage: image.path,
              });
              console.log(image);
            })
          }>
          <Image
            style={Styles.imgStyle}
            source={{uri: this.state.sourceImage}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.imgViewStyle}
          onPress={() =>
            ImagePicker.openCamera({
              mediaType: 'video',
            }).then(image => {
              console.log(image);
              sourceCamera=image.path
            })
          }>
          <Image style={Styles.imgStyle}
          source={{uri:this.state.sourceCamera}}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  imgViewStyle: {
    margin: 50,
  },
  imgStyle: {
    width: 300,
    height: 300,
  },
});
