import React, { useState } from 'react';
import { deleteUser } from '../../firebase'; 

const RemoveUser = () => {
  const [email, setEmail] = useState('');

  const handleRemoveUser = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteUser(email);
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