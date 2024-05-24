import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const useAddReport = () => {
  const reportsCollectionReference = collection(db, "Reports");

  const addReport = async (report) => {
    await addDoc(reportsCollectionReference, report);
  }

  return { addReport };
}

export default useAddReport;
