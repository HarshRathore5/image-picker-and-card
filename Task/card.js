import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {LoadImage} from './loadImage';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isLoading: false,
      page: 1,
      download: false,
    };
  }
  onLoadImage = () => {
    this.setState({
      download: true,
    });
  };
  header = () => {
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  };
  footer = () => {
    return (
      <View>
        <Text>Footer</Text>
        <TouchableOpacity
          onPress={() => {
            this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true});
          }}>
          <Text>top</Text>
        </TouchableOpacity>
      </View>
    );
  };
  hitAPI() {
    this.setState({isLoading: true});
    axios({
      method: 'get',
      url: 'https://reqres.in/api/users?page=' + this.state.page,
    })
      .then(response => {
        this.setState({
          feed:
            this.state.page == 1
              ? response.data.data
              : this.state.feed.concat(response.data.data),
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({isLoading: false});
        console.warn(err);
      });
  }
  refresh() {
    console.warn('Refreshed');
  }
  dataChanged() {
    console.warn('Data changed');
  }

  render() {
    return (
      <View style={Styles.ViewStyle}>
        <TouchableOpacity
          style={Styles.buttonStyle}
          onPress={() => this.hitAPI()}>
          <Text style={Styles.textStyle}>HitAPI</Text>
        </TouchableOpacity>
        {this.state.isLoading && <ActivityIndicator size="large" />}
        {this.state.feed.length > 0 && (
          <FlatList
            refreshing={false}
            onRefresh={() => {
              this.refresh();
            }}
            ListHeaderComponent={this.header()}
            ListFooterComponent={this.footer()}
            data={this.state.feed}
            renderItem={rowdata => (
              <View style={Styles.flatViewStyle}>
                <LoadImage
                  item={rowdata.item}
                  download={this.state.download}
                  onLoadImage={this.onLoadImage}
                />
                {/* <Image
                onLoad={}
                  style={Styles.imgStyle}
                  source={{uri: rowdata.item.avatar}}
                /> */}
                <Text style={Styles.textStyle}>
                  {rowdata.item.first_name} {rowdata.item.last_name}
                </Text>
              </View>
            )}
            ref="listRef"
            keyExtractor={(item, index) => {
              item.id.toString();
            }}
            onEndReachedThreshold={0.01}
            onEndReached={() => {
              if (this.state.page == 1) {
                this.setState(
                  {
                    page: this.state.page + 1,
                  },
                  () => {
                    {
                      this.state.isLoading && (
                        <ActivityIndicator size="large" />
                      );
                    }
                    {
                      this.hitAPI();
                    }
                  },
                );
              }
            }}
          />
        )}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  ViewStyle: {
    margin: 20,
    flex: 1,
  },
  flatViewStyle: {
    margin: 20,
    backgroundColor: '#4b0082',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    margin: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  textStyle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  imgStyle: {
    width: 100,
    height: 100,
    margin: 15,
  },
});
