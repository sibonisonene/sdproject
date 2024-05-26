import React, { useState } from 'react';
import useAddNotification from '../components/hooks/useAddNotification';
import '../index.css';

const IssueNotification = () => {
  const { addNotification } = useAddNotification();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNotification({ title, message });
    setTitle('');
    setMessage('');
    alert('Notification issued successfully');
  };

  return (
    <div className="notification-container">
      <h1>Issue Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Issue Notification</button>
      </form>
    </div>
  );
};

export default IssueNotification;
