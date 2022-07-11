// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDaRkAk7bXKVoFUNdsRSO7QZG8-fFMWtYA',
	authDomain: 'social-media-4007d.firebaseapp.com',
	projectId: 'social-media-4007d',
	storageBucket: 'social-media-4007d.appspot.com',
	messagingSenderId: '390559330353',
	appId: '1:390559330353:web:2de348f5d1e846587d2510',
	measurementId: 'G-RX7Y6JQM35',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);
