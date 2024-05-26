import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

const useGetNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const notificationsCollectionRef = collection(db, 'Notifications');

  useEffect(() => {
    const q = query(notificationsCollectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(docs);
    });

    return () => unsubscribe();
  }, []);

  return { notifications };
};

export default useGetNotifications;
