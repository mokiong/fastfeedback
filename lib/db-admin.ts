import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export async function getAllFeedBack(siteId) {
   try {
      const snapshot = await db
         .collection('feedback')
         .where('siteId', '==', siteId)
         .get();

      const feedback = [];

      if (snapshot.empty) {
         console.log('No matching documents.');
         return null;
      }

      snapshot.forEach((doc) => {
         feedback.push({ id: doc.id, ...doc.data() });
      });

      feedback.sort((a, b) =>
         compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
      );

      return { feedback };
   } catch (error) {
      return { error };
   }
}

export async function getAllSites() {
   try {
      const snapshot = await db.collection('sites').get();
      const sites = [];

      if (snapshot.empty) {
         console.log('No matching documents.');
         return;
      }

      snapshot.forEach((doc) => {
         sites.push({ id: doc.id, ...doc.data() });
      });

      return { sites };
   } catch (error) {
      console.log(error.message);
      return { error };
   }
}

export async function getUserSites(userId) {
   const snapshot = await db
      .collection('sites')
      .where('authorId', '==', userId)
      .get();

   const sites = [];

   if (snapshot.empty) {
      console.log('No matching documents.');
      return;
   }

   snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
   });

   return { sites };
}
