import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';

const url =
  'https://tse4.mm.bing.net/th?id=OIP.QswVhpC8_Y6Fu-rZ_4dZwQHaE8&pid=Api';

export default class UIFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      toggle: -1,
      dataFeed: [],
    };
  }
  toggleState(index) {
    this.setState({
      toggle: this.state.toggle === index?-1:index,
      
    });
  }

  getApi(body) {
     this.setState({
         toggle: -1,
         
     })
    axios({
      method: 'get',
      url:
        'https://newsapi.org/v2/everything?apiKey=969297fd06574c03bcc6f766fb37a42a&q=' +
        body,
    })
      .then(response => {
        console.log(response.data.articles);

        this.setState({
          dataFeed: response.data.articles,
        });
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  }
  render() {
    return (
      <View>
        <TouchableOpacity
        onPress={() => this.getApi(this.props.body)}>
          <Text>Click</Text>
        </TouchableOpacity>
        

        <FlatList
          extraData={this.state}
          data={this.state.dataFeed}
          renderItem={rowdata => (
            <View>
              <View style={Style.mainView}>
                <Image
                  style={Style.imgStyle}
                  source={{uri: rowdata.item.urlToImage || url}}
                />
                <View style={Style.dataView}>
                  <Text style={Style.titleStyle}>{rowdata.item.title}</Text>
                  <Text
                    style={Style.descriptionStyle}
                    numberOfLines={this.state.toggle== rowdata.index ? 0 : 1}>
                    {rowdata.item.content || rowdata.item.description}
                  </Text>
                  <TouchableOpacity onPress={() => this.toggleState(rowdata.index)}>
                    <Text style={Style.readTextStyle}>{this.state.toggle == -1 ? "Read more": "Read less"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const Style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowOpacity: 1,
    elevation: 5,
    shadowColor: 'lightgray',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  imgStyle: {
    margin: 10,
    width: 100,
    height: 100,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    marginRight: 15,
  },
  descriptionStyle: {
    padding: 10,
    marginRight: 15,
  },
  dataView: {
    padding: 10,
    marginRight: 80,
  },
  readTextStyle: {
    padding: 10,
  },

});
