import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthDetails = ({ onUserChange }) => {
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
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

  // return (
  //   <div>
  //     <button onClick={userSignOut}>Sign Out</button>
  //   </div>
  // );
};

export default AuthDetails;
