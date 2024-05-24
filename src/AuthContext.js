import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch the token and check for admin claim
        user.getIdTokenResult().then(idTokenResult => {
          // Include whether the user is an admin in the state
          const isAdmin = idTokenResult.claims.admin || false;
          setAuthUser({ ...user, isAdmin });  
        });
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
