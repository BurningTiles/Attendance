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
import {Toast, Root} from 'native-base';

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      backcount: 0,
    };
    this.login = this.login.bind(this);
  }

	componentDidMount() {}
	
	// To access the data it is compulsory to authenticate user and then only they can go to Home Screen.
  login(e) {
    //e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.replace('Home'))
      .catch((error) => {
        //console.log(error);
        alert(error.message);
      });
  }

  render() {
		//console.log(this.props.navigation);
    return (
      <ImageBackground
        source={require('./../assets/bg3.jpg')}
        style={styles.bgimage}>
        <View style={{flex: 1}} />
        <View style={{flex: 3, justifyContent: 'flex-end'}}>
          <Image
            source={require('./../assets/logo/logo.png')}
            style={{
              //top: 30,
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, flex: 6}}>
          <View style={{justifyContent: 'space-around', flex: 1}}>
            <View>
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
                this.login();
              }}
              style={{alignSelf: 'center'}}
              type="secondary"
              width={150}>
              Signin
            </MyButton>
            <MyButton
              onPress={(next) => {
                this.props.navigation.replace('Signup');
              }}
              style={{alignSelf: 'center'}}
              type="primary"
              width={150}>
              Signup
            </MyButton>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default SigninScreen;

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

/* export default class LoginScreen extends Component {
  state = {
		name: "",
		password: "",
	};


  continue = () => {
    this.props.navigation.navigate('Chat', {name: this.state.name});
  };

  render() {
    return (
				<ImageBackground source={require('../assets/background.jpg')} style={styles.bgimage} >
					<View style={{flex: 1, justifyContent: 'flex-end'}}>
						<Image
							source={require('../assets/logo/CSN.png')}
							style={{width: 100, height: 100, alignSelf: 'center', marginBottom: 20}}
						/>
					</View>
					<View style={{marginHorizontal: 20, flex: 2}}>
						<View style={{justifyContent: 'flex-start', flex: 1}}>
							<Text style={styles.header}>Welcome</Text>
							<View>
								<View style={styles.black} />
								<View style={styles.black_password} />
								<TextInput
									style={styles.input}
									placeholder="Username"
									onChangeText={(name) => {
										this.setState({name});
									}}
									value={this.state.name}
								/>
								<TextInput
									secureTextEntry={true}
									style={styles.password_input}
									placeholder="Password"
									onChangeText={(password) => {
										this.setState({password});
									}}
									value={this.state.password}
								/>
							</View>	
						</View>
						<View style={{justifyContent: 'flex-end'}} >
							<TouchableOpacity style={styles.continue} onPress={this.continue}>
								<Image
									source={require('../assets/logo/continue.png')}
									style={styles.continue}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514E5A',
		marginTop: 32,
		alignSelf: 'center'
  },
  input: {
		width: '100%',
		position: 'absolute',
    marginTop: 32,
    height: 50,
    borderWidth: 3,
    borderColor: '#0055FF',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#FFFFFF',
		fontWeight: '600',
		fontSize: 20,
	},
	password_input: {
		width: '100%',
		position: 'absolute',
    marginTop: 100,
    height: 50,
    borderWidth: 3,
    borderColor: '#0055FF',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#FFFFFF',
		fontWeight: '600',
		fontSize: 20,
	},
	black: {
    marginTop: 32,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 16,
    backgroundColor: "#223355",
		opacity: 0.7
	},
	black_password: {
		marginTop: 18,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 16,
    backgroundColor: "#223355",
		opacity: 0.7
  },
  continue: {
    width: 50,
		height: 50,
		marginBottom: 100,
		alignSelf: 'flex-end'
	},
	bgimage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
 */
