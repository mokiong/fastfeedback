import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
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

export const createSite = async (data) => {
   const site = firestore.collection('sites').doc();
   await site.set(data);

   return site;
};

export const updateSite = (id, newValues) => {
   return firestore.collection('sites').doc(id).update(newValues);
};

export const deleteSite = async (id) => {
   // firestore.collection('sites').doc(id).delete();

   const snapshot = await firestore
      .collection('feedback')
      .where('siteId', '==', id)
      .get();

   const batch = firestore.batch();

   snapshot.forEach((doc) => {
      console.log('doc', doc);
      batch.delete(doc.ref);
   });

   return batch.commit();
};

export const createFeedback = (data) => {
   const feedback = firestore.collection('feedback').doc();
   feedback.set(data);

   return feedback;
};

export const updateFeedback = (id, newValues) => {
   return firestore.collection('feedback').doc(id).update(newValues);
};

export const deleteFeedback = (id) => {
   return firestore
      .collection('feedback')
      .doc(id)
      .update({ status: 'removed' });
};
