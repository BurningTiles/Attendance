import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
} from 'react-native';

class list extends Component {

  render() {
    return (
      <Text>hello</Text>
    );
  }
}

export default list;

const styles = StyleSheet.create({
  bgimage: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  border: {
    top: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
  },
});
