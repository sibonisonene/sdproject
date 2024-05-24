import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../index.css';

const ReportItem = ({ report }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="report-item-container">
      <div ref={componentRef} className="report-item">
        <h2>Report {report.id}</h2>
        <p>{report.content}</p>
        <p>Date: {new Date(report.date.seconds * 1000).toLocaleDateString()}</p>
      </div>
      <button onClick={handlePrint}>Download Report as PDF</button>
    </div>
  );
};

export default ReportItem;
