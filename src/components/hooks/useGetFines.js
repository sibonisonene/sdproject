import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

const useGetFines = () => {
  const [fines, setFines] = useState([]);
  const finesCollectionReference = collection(db, "Fines");

  useEffect(() => {
    const q = query(finesCollectionReference);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const finesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFines(finesList);
    });

    return () => unsubscribe();
  }, []);

  return { fines };
}

export default useGetFines;
