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
  FlatList,
  ScrollView,
} from 'react-native';

class AttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
    };
  }

  createList(data) {
    let alist = [];
    for (var key in data) {
      alist.push(data[key].date + ' , ' + data[key].time);
		}
		alist.reverse();
    this.setState({attendance: alist});
  }

  componentDidMount() {
    firebase
      .database()
      .ref('Students/' + this.props.navigation.state.params.enrollment)
      .on('value', (snapshot) => {
        this.createList(snapshot.val());
      });
  }

  render() {
    console.log('enrollment : ', this.props.navigation.state.params.enrollment);
    console.log('Attendance : ', this.state.attendance);
    return (
      <ImageBackground
        source={require('./../assets/bg5.jpg')}
        style={styles.bgimage}>
        
          <View style={{height: 20}} />
          <Text style={styles.name}>
            {this.props.navigation.state.params.enrollment}
          </Text>
          <View style={{height: 20}} />
					<ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <FlatList
              data={this.state.attendance}
              keyExtractor={(item) => item}
              renderItem={({item}) => <ListItem title={item} />}
            />
          </View>
          <View style={{height: 30}} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const ListItem = ({title}) => (
  <View style={{height: 50}}>
    <View style={styles.item}>
      <Text style={styles.itemtext}>{title}</Text>
    </View>
  </View>
);

export default AttendanceScreen;

const styles = StyleSheet.create({
  bgimage: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 35,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  itemtext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  item: {
    backgroundColor: '#ffffff',
		borderRadius: 20,
		borderWidth: 3,
		borderColor: '#5599ff',
  },
});
