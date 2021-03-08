import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  BackHandler,
} from 'react-native';
import firebase from '../firebase';
//import {Toast, Root} from 'native-base';

class HomeScreen extends Component {
  state = {
    user: [],
  };

  signout = () => {
    firebase.auth().signOut();
    this.props.navigation.replace('Signin');
  };

  componentDidMount() {
    firebase
      .database()
      .ref('ids/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => this.setState({user: snapshot.val()}));

    /* BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
		); */
  }

  /* handleBackButton() {
    this.setState({backcount: this.state.backcount + 1});
    console.log('Back count : ', this.state.backcount);
    if (this.state.backcount < 2) {
      Toast.show({
        text: 'Press back again to exit App.',
        duration: 1000,
        onClose: () => {
          this.setState({backcount: 0});
        },
      });
    } else if (this.state.backcount == 2) BackHandler.exitApp();
    return true;
  } */

  render() {
    //console.log('executing');
    //console.log(firestore().collection('users').get());
    console.log('user : ', this.state.user);
    return (
      /* <Root> */
      <ImageBackground
        source={require('./../assets/bg4.jpg')}
        style={styles.bgimage}>
        <View style={{height: '80%', alignItems: 'center'}}>
          <View style={styles.list}>
            <View>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('Attendance', {
                    enrollment: this.state.user['enrollment'],
                  });
                }}>
                <Image
                  source={require('../assets/logo/attendance.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <Text style={styles.name}>Attendance</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('Feedback');
                }}>
                <Image
                  source={require('../assets/logo/feedback.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <Text style={styles.name}>Feedback</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.iconStyle} onPress={this.signout}>
                <Image
                  source={require('../assets/logo/logout.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <Text style={styles.name}>Signout</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      /* </Root> */
    );
  }
}

/* 
function HomeScreen() {
  return (
    <ImageBackground
      source={require('./../assets/bg1.jpg')}
      style={styles.bgimage}>
      <View style={{height: '80%', alignItems: 'center'}}>
        <View style={styles.list}>
          <TouchableOpacity
            style={styles.iconStyle}  onPress={this.continue} 
          >
            <Image
              source={require('../assets/logo/chat.png')}
              style={styles.iconStyle}
            />
						<Text style={styles.name}>Chat Room</Text>
          </TouchableOpacity>
					<TouchableOpacity
            style={styles.iconStyle}  onPress={this.continue} 
          >
            <Image
              source={require('../assets/logo/feedback.png')}
              style={styles.iconStyle}
            />
						<Text style={styles.name}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconStyle}  onPress={this.continue} 
          >
            <Image
              source={require('../assets/logo/logout.png')}
              style={styles.iconStyle}
            />
						<Text style={styles.name}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
*/

export default HomeScreen;

const styles = StyleSheet.create({
  iconStyle: {
    width: 100,
    height: 100,
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  list: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  name: {
    top: 10,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
  },
});
