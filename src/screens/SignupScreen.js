import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import firebase from './../firebase';
import MyButton from 'react-native-really-awesome-button/src/themes/rick';
import { StyleProvider } from 'native-base';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollment: '',
      email: '',
			password: '',
			x: '',
    };
		this.signup = this.signup.bind();
  }

	componentDidMount() {}

  // At time of signup object of user will be created which contains information regarding user profile and will be stored on database.
	signup(e) {
    //e.preventDefault();
    //console.log('trying to signup\n\n\n');
		let email = e.state.email.toLowerCase();
		let x = e.state.x['email'];

		console.log('x',x);
		console.log('e',email);

    if (email==x) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(e.state.email, e.state.password)
        .then(async () => {
					await firebase.database().ref('ids/'+firebase.auth().currentUser.uid).set({'enrollment': e.state.enrollment});
          e.props.navigation.replace('Home');
        })
        .catch((error) => {
          //console.log(error);
          alert(error.message);
        });
    } else {
      alert('Please check your Email and Enrollment number.');
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('./../assets/bg3.jpg')}
        style={styles.bgimage}>
        <View style={{flex: 1}} />
        <View style={{flex: 3, justifyContent: 'flex-end'}}>
          <Image
            source={require('./../assets/logo/logo.png')}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, flex: 6}}>
          <View style={{justifyContent: 'space-around', flex: 2}}>
            <View>
              <View style={styles.black}>
                <TextInput
                  style={styles.input}
                  placeholder="Enrollment"
                  onChangeText={(enrollment) => {
										this.setState({enrollment});
										firebase.database().ref('ids/'+enrollment).on('value', (snap) => {
											this.setState({x: snap.val()});
										});
                  }}
                  value={this.state.enrollment}></TextInput>
              </View>
              <View style={styles.black}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(email) => {
                    this.setState({email});
                  }}
                  value={this.state.email}></TextInput>
              </View>
              <View style={styles.black}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(password) => {
                    this.setState({password});
                  }}
                  value={this.state.password}
                />
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flex: 1}}>
            <MyButton
              onPress={(next) => {
                this.signup(this);
              }}
              style={{alignSelf: 'center'}}
              type="secondary"
              width={150}>
              Signup
            </MyButton>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 3,
    borderColor: '#0055FF',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
  },
  black: {
    marginTop: 20,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    opacity: 1,
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
