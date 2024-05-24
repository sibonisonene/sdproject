import React, { useState, useContext } from 'react';
import useAddIssue from '../components/hooks/useAddIssue';
import useGetIssues from '../components/hooks/useGetIssues';
import { AuthContext } from '../AuthContext';
import '../index.css';

const Issues = () => {
  const { authUser } = useContext(AuthContext);
  const { addIssue } = useAddIssue();
  const { issues } = useGetIssues();
  const [newIssue, setNewIssue] = useState({ title: '', description: '', priority: 'medium' });

  const handleAddIssue = async (e) => {
    e.preventDefault();
    await addIssue({ ...newIssue, reportedBy: authUser.email, status: 'pending' });
    setNewIssue({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div className="issues">
      <h1>Issues</h1>
      <form onSubmit={handleAddIssue}>
        <input
          type="text"
          placeholder="Title"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
          required
        />
        <select
          value={newIssue.priority}
          onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Issue</button>
      </form>
      <ul>
        {issues.map(issue => (
          <li key={issue.id} className="issue-item">
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <p>Priority: {issue.priority}</p>
            <p>Reported by: {issue.reportedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Issues;
