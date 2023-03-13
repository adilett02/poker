import React from 'react';
import firebase from 'firebase/app';
import { Route, Routes } from 'react-router-dom';
import 'firebase/firestore';

import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Error from './pages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.name);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser([user.displayName, user.uid]));
      console.log(user);
    } else {
      console.log('didnt auth');
    }
  });
  console.log(user);

  if (user) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default App;
