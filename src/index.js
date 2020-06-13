import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import store from "./store/index.store";
import { Provider as ReduxProvider } from "react-redux";
import * as firebase from 'firebase';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyB9UPctyhfoGwBdGtGZRnUBZYz-mkzhWOo",
    authDomain: "react-gym-59b28.firebaseapp.com",
    databaseURL: "https://react-gym-59b28.firebaseio.com",
    projectId: "react-gym-59b28",
    storageBucket: "react-gym-59b28.appspot.com",
    messagingSenderId: "584599914562",
    appId: "1:584599914562:web:9711d65a53891551fd85db"
  };
  
const fire = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { fire, storage}

const application = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <FirestoreProvider firebase={firebase}>
                <App />
            </FirestoreProvider>
        </BrowserRouter>
    </ReduxProvider>
) 

ReactDOM.render(application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
