import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD_5WgO34X_i6BedMPjIs-SqT7jh6GdmMw',
  authDomain: 'attendace-b2f9c.firebaseapp.com',
  databaseURL: 'https://attendace-b2f9c-default-rtdb.firebaseio.com',
  projectId: 'attendace-b2f9c',
  storageBucket: 'attendace-b2f9c.appspot.com',
  messagingSenderId: '863464073774',
  appId: '1:863464073774:web:09dd95a89026b1db5bcdbf',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export default firebase;

/* import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCciInTDWdwOw5FZIS9ka9zxUKhqUB3e3k',
        authDomain: 'csworld-5feed.firebaseapp.com',
        databaseURL: 'https://csworld-5feed.firebaseio.com',
        projectId: 'csworld-5feed',
        storageBucket: 'csworld-5feed.appspot.com',
        messagingSenderId: '1051111303089',
        appId: '1:1051111303089:web:ac1125c170158a89c47f90',
        measurementId: 'G-CM1F87KDTB',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    }
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
 */
