import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const useAddFine = () => {
  const finesCollectionReference = collection(db, "Fines");

  const addFine = async ({ email, reason, amount, status }) => {
    await addDoc(finesCollectionReference, {
      email,
      reason,
      amount,
      status,
      createdAt: new Date()
    });
  }

  return { addFine };
}

export default useAddFine;
