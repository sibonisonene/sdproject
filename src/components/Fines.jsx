import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import useGetUserFines from '../components/hooks/useGetUserFines';
import useUpdateFine from '../components/hooks/useUpdateFine';
import '../index.css';

const Fines = () => {
  const { fines } = useGetUserFines();
  const { updateFine } = useUpdateFine();
  const { authUser } = useContext(AuthContext);
  
  const handlePayFine = async (id) => {
    await updateFine(id, { status: 'paid' });
  };

  if (!authUser) return <p>Loading...</p>;

  return (
    <div className="fines-container">
      <h1>Your Fines</h1>
      <div className="fines-list">
        {fines.map((fine) => (
          <div key={fine.id} className="fine-item">
            <p>Reason: {fine.reason}</p>
            <p>Amount: R{fine.amount}</p>
            <p>Status: {fine.status}</p>
            {fine.status === 'outstanding' && (
              <button onClick={() => handlePayFine(fine.id)}>Pay</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fines;
