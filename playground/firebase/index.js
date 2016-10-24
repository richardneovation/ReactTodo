import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyA2sTgFW4M66Oir6xF_6EQX6pVuKK8xRKQ",
  authDomain: "todo-app-e002a.firebaseapp.com",
  databaseURL: "https://todo-app-e002a.firebaseio.com",
  storageBucket: "todo-app-e002a.appspot.com",
  messagingSenderId: "734465557162"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '0.0.1'
  },
  isRunning: true,
  user: {
    name: 'Richard',
    age: 25
  }
});

var todosRef = firebaseRef.child('todos');
todosRef.on('child_added', (snapshot) => {
  console.log('Todo added', snapshot.key, snapshot.val());
});

todosRef.push({text:'Walk the dog'});
todosRef.push({text:'Go to sleep'});
