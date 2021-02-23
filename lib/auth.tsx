import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';

import firebase from './firebase';
import { createUser } from './firestore';

const AuthContext = createContext(null);

export function ProvideAuth({ children }) {
   const auth = useProvideAuth();
   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
   return useContext(AuthContext);
};

const formatUser = (data) => {
   return {
      uid: data.user.uid,
      email: data.user.email,
      name: data.user.providerData[0].displayName,
      provider: data.user.providerData[0].providerId,
      photoUrl: data.user.photoURL,
      token: data.user.za,
   };
};

function useProvideAuth() {
   const [user, setUser] = useState(null);

   const handleUser = (rawUser) => {
      if (rawUser) {
         const formattedUser = formatUser(rawUser);
         const { token, ...userWithoutToken } = formattedUser;

         createUser(formattedUser.uid, userWithoutToken);
         setUser(formattedUser);

         cookie.set('fast-feedback-auth', true, {
            expires: 1,
         });

         return formattedUser;
      } else {
         setUser(false);
         cookie.remove('fast-feedback-auth');
         return false;
      }
   };

   const signinWithGithub = () => {
      return firebase
         .auth()
         .signInWithPopup(new firebase.auth.GithubAuthProvider())
         .then((response) => {
            handleUser(response);
         });
   };

   const signinWithGoogle = () => {
      return firebase
         .auth()
         .signInWithPopup(new firebase.auth.GoogleAuthProvider())
         .then((response) => {
            handleUser(response);
         });
   };

   const signout = () => {
      return firebase
         .auth()
         .signOut()
         .then(() => {
            handleUser(false);
         });
   };

   useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            handleUser({ user });
         } else {
            handleUser(false);
         }
      });

      return () => unsubscribe();
   }, []);

   return {
      user,
      signinWithGithub,
      signinWithGoogle,
      signout,
   };
}
