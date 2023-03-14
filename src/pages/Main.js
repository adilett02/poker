import React from 'react';
import { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/slices/gameSlice';

const Main = () => {
  let localImg = false;

  const dispatch = useDispatch();

  const data = useSelector((state) => state.game.data);
  const uid = useSelector((state) => state.user.uid);

  console.log(data ? data.users[uid] : 'ad');

  const [handCard, setHandCard] = useState([]);

  const tableCard = data ? data.table.cards : [];
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  useEffect(() => {
    firestore
      .collection('poker')
      .doc('game')
      .onSnapshot((doc) => {
        dispatch(setData(doc.data()));
        console.log('Current data: ', doc.data());
      });
  }, []);

  useEffect(() => {
    let userId = `users.${uid}.handCard`;
    firestore
      .collection('poker')
      .doc('game')
      .update(
        {
          [userId]: handCard,
        },
        // {
        //   merge: true,
        // },
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
          [uid]: {
            handCard: [],
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
    <div>
      <button onClick={getInitialDate}>get Initial Data</button>
      <button onClick={startGame}>start game</button>
      <button onClick={giveHandCard}>give me Card</button>
      <button onClick={giveTableCard}>{data ? data.table.status : 'wef'}</button>

      {handCard.map((el) => (
        <img key={el} src={`./cards/${el}.svg`} alt="" />
      ))}
      {tableCard.map((el) => (
        <img key={el} src={`./cards/${el}.svg`} alt="" />
      ))}
    </div>
  );
};

export default Main;
