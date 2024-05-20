import React, { useState } from 'react';
import AuthDetails from '../components/AuthDetails'; 

const Dashboard = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <AuthDetails onUserChange={setUser} />
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
        </div>
      ) : (
        <p>Please log in to see your details.</p>
      )}
    </div>
  );
};

export default Dashboard;
