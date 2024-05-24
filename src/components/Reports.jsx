import React from 'react';
import useGetReports from '../components/hooks/useGetReports';
import ReportItem from './ReportItem';
import '../index.css';

const Reports = () => {
  const { reports } = useGetReports();

  return (
    <div className="reports">
      <h1>Reports</h1>
      {reports.map(report => (
        <ReportItem key={report.id} report={report} />
      ))}
    </div>
  );
};

export default Reports;
