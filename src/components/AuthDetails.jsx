import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, requestNotificationPermission } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthDetails = ({ onUserChange }) => {
  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await requestNotificationPermission();
        const userDoc = {
          email: user.email.toLowerCase(), // Ensure email is stored in lowercase
          fcmToken: token || "" // Set fcmToken, even if it's an empty string
        };
        await setDoc(doc(db, 'Users', user.uid), userDoc, { merge: true });

        user.getIdTokenResult().then(idTokenResult => {
          const isAdmin = !!idTokenResult.claims.admin;
          onUserChange({ ...user, isAdmin });
        });
      } else {
        onUserChange(null);
      }
    });

    return () => {
      listen();
    };
  }, [onUserChange]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return null;
};

export default AuthDetails;
