import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDWOWOtwc-_HrtGshUx0OzOtJ23TosACEU',
    authDomain: 'restaurantapp-7778a.firebaseapp.com',
    databaseURL: 'https://restaurantapp-7778a-default-rtdb.firebaseio.com',
    projectId: 'restaurantapp-7778a',
    storageBucket: 'restaurantapp-7778a.appspot.com',
    messagingSenderId: '216459305434',
    appId: '1:216459305434:web:ceaa7e474aa2eb034660e3',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
