import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBYNJdF7V1SyAui0PAPyThAR29CBjvoi2s',
    authDomain: 'diversityhackathon-425ac.firebaseapp.com',
    databaseURL: 'https://diversityhackathon-425ac.firebaseio.com',
    projectId: 'diversityhackathon-425ac',
    storageBucket: 'diversityhackathon-425ac.appspot.com',
    messagingSenderId: '604775381569',
    appId: '1:604775381569:web:0e46d50f2057366fa324c0',
    measurementId: 'G-17EGLD19R8'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const eventsCollection = db.collection('events')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    eventsCollection
}