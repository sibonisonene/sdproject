import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const useUpdateFine = () => {
  const updateFine = async (id, updatedFields) => {
    const fineDoc = doc(db, "Fines", id);
    await updateDoc(fineDoc, updatedFields);
  }

  return { updateFine };
}

export default useUpdateFine;
