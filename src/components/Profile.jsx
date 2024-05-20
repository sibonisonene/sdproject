import React from 'react';
import { useState } from 'react';
import useGetProfile from './hooks/useGetProfile'; 

const Profile = () => {

    const {profile} = useGetProfile();
  
  return (
    <div className="profile">
      <h1>Profile</h1>
      <ul>
        {profile.map((prof) => {
            const {email, fullName, surname} = prof;
            return <li>
                <h4>{fullName} {surname}</h4>
                <p>{email}</p>
            </li>
        })}
      </ul>
    </div>
  );
};

export default Profile;
