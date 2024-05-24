import React from 'react';
import useGetProfile from '../components/hooks/useGetProfile';
import '../index.css';

const Profile = () => {
  const { profile } = useGetProfile();

  return (
    <div className="profile">
      <h1>Profile</h1>
      {profile.length > 0 ? (
        <ul>
          {profile.map((prof) => {
            const { email, fullName, surname, phoneNumber, address } = prof;
            return (
              <li key={email} className="profile-item">
                <h4>Welcome, {fullName} {surname}</h4>
                <p>Email: {email}</p>
                <p>Phone Number: {phoneNumber}</p>
                <p>Address: {address}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
