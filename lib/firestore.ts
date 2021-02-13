import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
   console.log('adding to db');
   return firestore
      .collection('users')
      .doc(uid)
      .set(
         {
            uid,
            ...data,
         },
         { merge: true }
      );
};
