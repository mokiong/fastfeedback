import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export const getUser = async (uid) => {
   const doc = await db.collection('users').doc(uid).get();

   if (!doc.exists) {
      return null;
   }

   return { user: doc.data() };
};

export const getPopularSites = async () => {
   try {
      const snapshot = await db
         .collection('sites')
         // .orderBy('ratings', 'desc')
         .limit(5)
         .get();
      const sites = [];

      if (snapshot.empty) {
         console.log('No matching documents getAllSites.');
         return { sites: [] };
      }

      snapshot.forEach((doc) => {
         sites.push({ id: doc.id, ...doc.data() });
      });

      return { sites };
   } catch (error) {
      console.log(error.message);
      return { error };
   }
};

export async function getAllFeedBack(siteId, route) {
   try {
      let ref = db
         .collection('feedback')
         .where('siteId', '==', siteId)
         .where('status', 'in', ['pending', 'active']);

      if (route) {
         ref = ref.where('route', '==', route);
      }

      const snapshot = await ref.get();
      const feedback = [];

      if (snapshot.empty) {
         console.log('No matching documents get all feedback');
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
         console.log('No matching documents getAllSites.');
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

export async function getSite(siteId) {
   try {
      const doc = await db.collection('sites').doc(siteId).get();
      const site = { id: doc.id, ...doc.data() };

      if (!doc.exists) {
         console.log('No matching documents getSite.');
         return;
      }

      return { site };
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
      console.log('No matching documents getUserSites.');
      return;
   }

   snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
   });

   sites.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
   );

   return { sites };
}

export async function getUserFeedback(userId) {
   const snapshot = await db
      .collection('feedback')
      .where('authorId', '==', userId)
      .where('status', 'in', ['pending', 'active'])
      .get();

   const feedback = [];

   if (snapshot.empty) {
      return { feedback: null };
   }

   snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
   });

   return { feedback };
}
