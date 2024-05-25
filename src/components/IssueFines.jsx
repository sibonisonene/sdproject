import React, { useState } from 'react';
import useAddFine from '../components/hooks/useAddFine';
import useGetFines from '../components/hooks/useGetFines';
import useUpdateFine from '../components/hooks/useUpdateFine';
import '../index.css';

const IssueFines = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('outstanding');
  const { addFine } = useAddFine();
  const { fines } = useGetFines();
  const { updateFine } = useUpdateFine();

  const handleAddFine = async (e) => {
    e.preventDefault();
    await addFine({ email, reason, amount, status });
    setEmail('');
    setReason('');
    setAmount('');
    setStatus('outstanding');
  }

  const handleUpdateStatus = async (id, newStatus) => {
    await updateFine(id, { status: newStatus });
  }

  return (
    <div className="issue-fines-container">
      <h1>Issue Fines</h1>
      <form onSubmit={handleAddFine}>
        <input
          type="email"
          placeholder="Enter resident's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reason for fine"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="outstanding">Outstanding</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Issue Fine</button>
      </form>
      <h2>Existing Fines</h2>
      <div className="fines-list">
        {fines.map(fine => (
          <div key={fine.id} className="fine-item">
            <p>Email: {fine.email}</p>
            <p>Reason: {fine.reason}</p>
            <p>Amount: R{fine.amount}</p>
            <p>Status: {fine.status}</p>
            <button onClick={() => handleUpdateStatus(fine.id, fine.status === 'outstanding' ? 'paid' : 'outstanding')}>
              Mark as {fine.status === 'outstanding' ? 'Paid' : 'Outstanding'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssueFines;
