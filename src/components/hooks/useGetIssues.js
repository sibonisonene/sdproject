import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

const useGetIssues = () => {
  const [issues, setIssues] = useState([]);
  const issuesCollectionReference = collection(db, "Issues");

  useEffect(() => {
    const unsubscribe = onSnapshot(issuesCollectionReference, (snapshot) => {
      const issuesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIssues(issuesList);
    });

    return () => unsubscribe();
  }, []);

  return { issues };
}

export default useGetIssues;
