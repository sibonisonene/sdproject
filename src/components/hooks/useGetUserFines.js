import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';

const useGetUserFines = () => {
  const [fines, setFines] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const finesCollectionReference = collection(db, 'Fines');
    const q = query(finesCollectionReference, where('email', '==', user.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const finesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFines(finesList);
    });

    return () => unsubscribe();
  }, [user]);

  return { fines };
};

export default useGetUserFines;
