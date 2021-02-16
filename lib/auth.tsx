import firebase from './firebase';
import React, { useState, useEffect, useContext, createContext } from 'react';
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
   console.log(data.user);
   return {
      uid: data.user.uid,
      email: data.user.email,
      name: data.user.displayName,
      provider: data.user.providerData[0].providerId,
      photoUrl: data.user.photoURL,
   };
};

function useProvideAuth() {
   const [user, setUser] = useState(null);

   const handleUser = (rawUser) => {
      if (rawUser) {
         const formattedUser = formatUser(rawUser);
         createUser(formattedUser.uid, formattedUser);
         setUser(formattedUser);
         return formattedUser;
      } else {
         setUser(false);
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
            setUser(user);
         } else {
            setUser(false);
         }
      });

      return () => unsubscribe();
   }, []);

   return {
      user,
      signinWithGithub,
      signout,
   };
}
