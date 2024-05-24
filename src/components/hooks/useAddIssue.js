import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const useAddIssue = () => {
  const issuesCollectionReference = collection(db, "Issues");

  const addIssue = async ({ title, description, status, priority, reportedBy }) => {
    await addDoc(issuesCollectionReference, {
      title,
      description,
      status,
      priority,
      reportedBy,
      reportedDate: new Date()
    });
  }

  return { addIssue };
}

export default useAddIssue;
