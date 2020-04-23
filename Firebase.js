import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// This firebase.js keeps all the fuctions we need to work with firebase like
// pushing product to firebase, deleting item,changing item, authenticating people etc.
//We will be importing firebase.js file where ever we need

//This is the config settings we get from firebase website
//Click on the gear towards top left section Project Overview --> In General section and scroll down to see the changes
let config = {
    apiKey: "AIzaSyB4amsAqkm2FRGAcYlPe2svkBs-w9vxFIQ",
    authDomain: "cargo-488e8.firebaseapp.com",
    databaseURL: "https://cargo-488e8.firebaseio.com",
    projectId: "cargo-488e8",
    storageBucket: "cargo-488e8.appspot.com",
    messagingSenderId: "572236256696",
    appId: "1:572236256696:web:297a96ed7048a797"
}

//cargo development configuration
var devConfig = {
    apiKey: "AIzaSyBrySojH8TyaXm-a5SF7Ij6PgyeL4Ry2bw",
    authDomain: "cargo-dev-84da1.firebaseapp.com",
    databaseURL: "https://cargo-dev-84da1.firebaseio.com",
    projectId: "cargo-dev-84da1",
    storageBucket: "cargo-dev-84da1.appspot.com",
    messagingSenderId: "12592995924",
    appId: "1:12592995924:web:f0da78ae301477599697c1",
    measurementId: "G-DHSCZVLZL5"
  };


//We have to initialize firebase before doing anything with it
firebase.initializeApp(devConfig);

console.log('Firebase initialized');


export default firebase;


