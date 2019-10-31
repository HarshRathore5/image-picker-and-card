import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

export const LoadImage = (props) => {
 
    return (
      <View>
      <Image
        onLoad={props.onLoadImage}
        style={Styles.imgStyle}
        source={props.download ? {uri: props.item.avatar} : require('./goldMedal.png')}
      />
      </View>
    );
};
// export class LoadImage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       download: false,
//     };
//   }
//   onLoadImage = () => {
//     this.setState({download: true});
//   };
//   render() {
//     return (
//       <View>
//         <Image
//           onLoad={() => this.onLoadImage()}
//           style={Styles.imgStyle}
//           source={
//             this.state.download
//               ? {uri: this.props.item.avatar}
//               : require('./goldMedal.png')
//           }
//         />
//       </View>
//     );
//   }
// }

const Styles = StyleSheet.create({
  imgStyle: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 10,
  },
});
