import React, { useState } from 'react';
import { deleteUser } from '../../firebase'; 
import useDeleteProfile from '../hooks/useDeleteProfile';
import { auth } from '../../firebase';
import AuthDetails from '../AuthDetails';

const RemoveUser = () => {
  const [email, setEmail] = useState('');
  const { deleteProfile } = useDeleteProfile();

  const handleRemoveUser = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteUser(email);
      await deleteProfile(email);
      console.log("Profile deleted successfully");
      alert(result.message); 
    } catch (error) {
      alert(`Error: ${error.message}`); 
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleRemoveUser}>
        <h1>Remove a User</h1>
        <input
          type="email"
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Remove User</button>
      </form>
    </div>
  );
};

export default RemoveUser;