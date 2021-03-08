import React, {Component} from 'react';
import firebase from '../firebase';
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

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
		};
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
				this.setState({user});
				this.props.navigation.navigate('Home');
			}else{
				this.setState({user:{}});
			}
		});
  }

  render() {
    return (
      <ImageBackground
        source={require('./../assets/bg4.jpg')}
        style={styles.bgimage}>
        <View>{firebase.auth().currentUser ? this.props.navigation.navigate('Home') : this.props.navigation.navigate('Signin')}</View>
				<Text style={styles.text}>Press back again to exit.</Text>
      </ImageBackground>
    );
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
	},
	text: {
		alignSelf: 'center',
		color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
	},
});
