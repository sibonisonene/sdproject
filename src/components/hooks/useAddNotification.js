import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const useAddNotification = () => {
  const notificationsCollectionRef = collection(db, 'Notifications');

  const addNotification = async ({ title, message }) => {
    await addDoc(notificationsCollectionRef, {
      title,
      message,
      timestamp: new Date(),
    });
  };

  return { addNotification };
};

export default useAddNotification;
