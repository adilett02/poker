import axios from 'axios';
import './app.css';
import { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
// import img from './assets/cards/2C.svg';
function App() {
  const [data, setData] = useState(undefined);
  const [handCard, setHandCard] = useState([]);
  // const [tableCard, setTableCard] = useState([]);

  const tableCard = data ? data.table.cards : [];
  const firestore = firebase.firestore();

  useEffect(() => {
    firestore
      .collection('poker')
      .doc('game')
      .onSnapshot((doc) => {
        setData(doc.data());
        console.log('Current data: ', doc.data());
      });
  }, []);

  useEffect(() => {
    firestore
      .collection('poker')
      .doc('game')
      .update(
        {
          'users.user1.handCard': handCard,
        },
        {
          merge: true,
        },
      )
      .then(() => {
        console.log('update handCard');
      });
  }, [handCard]);

  let giveHandCard = () => {
    setHandCard(['9H', 'TH']);
  };
  let giveTableCard = () => {
    if (data.table.cards.length === 0) {
      firestore
        .collection('poker')
        .doc('game')
        .update({
          'table.cards': ['2S', 'KD', 'QC'],
          'table.status': 'show turn',
        });
    } else if (data.table.cards.length === 3) {
      firestore
        .collection('poker')
        .doc('game')
        .update({
          'table.cards': firebase.firestore.FieldValue.arrayUnion('AC'),
          'table.status': 'show river',
        });
    } else if (data.table.cards.length === 4) {
      firestore
        .collection('poker')
        .doc('game')
        .update({
          'table.cards': firebase.firestore.FieldValue.arrayUnion('KC'),
          'table.status': 'finish',
        });
    }
  };
  let startGame = () => {};
  let getInitialDate = () => {
    firestore
      .collection('poker')
      .doc('game')
      .set({
        users: {
          user1: {
            handCard: [],
            money: 1000,
            status: 'check',
            turnToChoice: false,
          },
          user2: {
            money: 1000,
            status: 'check',
            turnToChoice: false,
          },
        },
        deck: [
          '2S',
          '3S',
          '4S',
          '5S',
          '6S',
          '7S',
          '8S',
          '9S',
          'TS',
          'JS',
          'QS',
          'KS',
          'AS',
          '2D',
          '3D',
          '4D',
          '5D',
          '6D',
          '7D',
          '8D',
          '9D',
          'TD',
          'JD',
          'QD',
          'KD',
          'AD',
          '2H',
          '3H',
          '4H',
          '5H',
          '6H',
          '7H',
          '8H',
          '9H',
          'TH',
          'JH',
          'QH',
          'KH',
          'AH',
          '2C',
          '3C',
          '4C',
          '5C',
          '6C',
          '7C',
          '8C',
          '9C',
          'TC',
          'JC',
          'QC',
          'KC',
          'AC',
        ],
        table: {
          status: 'show flop',
          cards: [],
        },
      })
      .then(() => {
        console.log('set');
      });

    setHandCard([]);
  };

  return (
    <div className="App">
      <button onClick={getInitialDate}>get Initial Date</button>
      <button onClick={startGame}>start game</button>
      <button onClick={giveHandCard}>give me Card</button>
      <button onClick={giveTableCard}>{data ? data.table.status : 'wef'}</button>

      {handCard.map((el) => (
        <img src={`./cards/${el}.svg`} alt="" />
      ))}
      {tableCard.map((el) => (
        <img src={`./cards/${el}.svg`} alt="" />
      ))}
    </div>
  );
}

export default App;
