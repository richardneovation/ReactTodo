import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyA2sTgFW4M66Oir6xF_6EQX6pVuKK8xRKQ",
    authDomain: "todo-app-e002a.firebaseapp.com",
    databaseURL: "https://todo-app-e002a.firebaseio.com",
    storageBucket: "todo-app-e002a.appspot.com",
    messagingSenderId: "734465557162"
  };

  firebase.initializeApp(config);
} catch (e) {
  
}

export var firebaseRef = firebase.database().ref();
export default firebase;
