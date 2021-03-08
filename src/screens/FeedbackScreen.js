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
import MyButton from 'react-native-really-awesome-button/src/themes/rick';

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

	// Here we created object of Feedback which contains Email Id, User ID and Feedback message.
	// Now this function will push this object to the database and inform user about it.
  send = () => {
    firebase.database().ref('feedbacks').push({
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
      message: this.state.message,
		});
		alert("Thank you...\nWe will look into it...");
		this.setState({message: ""});
  };

  render() {
    return (
      <ImageBackground
        source={require('./../assets/bg5.jpg')}
        style={styles.bgimage}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'column',
						height: '100%',
						width: '100%',
          }}>
          <View style={{flex: 1}} />
          <View style={{flex: 3, width: '100%'}}>
            <TextInput
              style={styles.input}
              placeholder="Any query or suggestion..."
              onChangeText={(message) => {
                this.setState({message});
              }}
              value={this.state.message}
            />
          </View>
					<View style={{flex:1}} />
          <View style={{flex: 1}}>
            <MyButton
              style={{alignSelf: 'center'}}
              type="secondary"
              width={150}
              onPress={() => {
                this.send();
              }}>
              Submit
            </MyButton>
          </View>
          <View style={{flex: 1}} />
        </View>
      </ImageBackground>
    );
  }
}

export default FeedbackScreen;

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
  input: {
		backgroundColor: '#ffffff',
		alignSelf: 'center',
    width: '80%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#55aaff',
    borderRadius: 30,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 20,
  },
});
