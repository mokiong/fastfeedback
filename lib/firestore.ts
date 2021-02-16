import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
   console.log('adding new user');
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

export const createSite = (data) => {
   console.log('adding new site');
   return firestore.collection('sites').add(data);
};
