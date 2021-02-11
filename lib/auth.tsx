import firebase from './firebase';
import React, { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext(null);

export function ProvideAuth({ children }) {
   const auth = useProvideAuth();
   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
   return useContext(AuthContext);
};

function useProvideAuth() {
   const [user, setUser] = useState(null);
   console.log(user);
   const signinWithGithub = () => {
      return firebase
         .auth()
         .signInWithPopup(new firebase.auth.GithubAuthProvider())
         .then((response) => {
            setUser(response.user);
            return response.user;
         });
   };

   const signout = () => {
      return firebase
         .auth()
         .signOut()
         .then(() => {
            setUser(false);
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
