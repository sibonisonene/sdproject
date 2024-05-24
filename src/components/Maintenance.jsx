import React, { useState } from 'react';
import useGetIssues from '../components/hooks/useGetIssues';
import useUpdateIssue from '../components/hooks/useUpdateIssue';
import useDeleteIssue from '../components/hooks/useDeleteIssue';
import useAddReport from '../components/hooks/useAddReport';
import '../index.css';

const Maintenance = () => {
  const { issues } = useGetIssues();
  const { updateIssue } = useUpdateIssue();
  const { deleteIssue } = useDeleteIssue();
  const { addReport } = useAddReport();
  const [reportContent, setReportContent] = useState('');

  const handleUpdateIssue = async (id, status) => {
    await updateIssue(id, { status });
  };

  const handleDeleteIssue = async (id) => {
    await deleteIssue(id);
  };

  const handleIssueReport = async (e) => {
    e.preventDefault();
    await addReport({ content: reportContent, date: new Date() });
    setReportContent('');
  };

  return (
    <div className="maintenance">
      <h1>Maintenance</h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id} className="issue-item">
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <p>Priority: {issue.priority}</p>
            <p>Reported by: {issue.reportedBy}</p>
            <select
              value={issue.status}
              onChange={(e) => handleUpdateIssue(issue.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleIssueReport}>
        <textarea
          placeholder="Enter report content"
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          required
        />
        <button type="submit">Issue Report</button>
      </form>
    </div>
  );
}

export default Maintenance;
