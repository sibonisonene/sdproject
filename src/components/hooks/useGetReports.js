import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

const useGetReports = () => {
  const [reports, setReports] = useState([]);
  const reportsCollectionReference = collection(db, "Reports");

  useEffect(() => {
    const unsubscribe = onSnapshot(reportsCollectionReference, (snapshot) => {
      const reportsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsList);
    });

    return () => unsubscribe();
  }, []);

  return { reports };
}

export default useGetReports;
