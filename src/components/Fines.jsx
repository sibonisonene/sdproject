import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import useGetUserFines from '../components/hooks/useGetUserFines';
import useUpdateFine from '../components/hooks/useUpdateFine';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../index.css';

const Fines = () => {
  const { fines } = useGetUserFines();
  const { updateFine } = useUpdateFine();
  const { authUser } = useContext(AuthContext);

  const handlePayFine = async (id) => {
    await updateFine(id, { status: 'paid' });
  };

  const generatePDF = async (fine) => {
    const input = document.getElementById(`fine-${fine.id}`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`fine_${fine.id}.pdf`);
  };

  if (!authUser) return <p>Loading...</p>;

  return (
    <div className="fines-container">
      <h1>Your Fines</h1>
      <div className="fines-list">
        {fines.map((fine) => (
          <div key={fine.id} id={`fine-${fine.id}`} className="fine-item">
            <p>Reason: {fine.reason}</p>
            <p>Amount: R{fine.amount}</p>
            <p>Status: {fine.status}</p>
            {fine.status === 'outstanding' && (
              <button onClick={() => handlePayFine(fine.id)}>Pay</button>
            )}
            <button onClick={() => generatePDF(fine)}>Download as PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fines;
