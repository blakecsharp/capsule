import React, { useContext, useEffect, useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = React.createContext();
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [appLoading, setAppLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  React.useEffect(() => {
    setAppLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    setAppLoading(false);
  });

  const signup = async (email, password, firstName) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userContext) => {
        /*
        userContext.user.updateProfile({
          displayName: firstName,
        });
        */
      }
    );
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    appLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
