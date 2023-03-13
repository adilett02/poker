import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

firebase.initializeApp({
  apiKey: 'AIzaSyC3HcrtjPzl2SjgWT8sp3dsmFTBWtZqCxA',
  authDomain: 'poker-5af61.firebaseapp.com',
  projectId: 'poker-5af61',
  storageBucket: 'poker-5af61.appspot.com',
  messagingSenderId: '77485420186',
  appId: '1:77485420186:web:b798299a964ac8e4233923',
  measurementId: 'G-EH1CBW9V1R',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// request.time < timestamp.date(2023, 4, 3)
