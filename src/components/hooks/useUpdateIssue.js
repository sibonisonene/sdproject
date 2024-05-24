import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const useUpdateIssue = () => {
  const updateIssue = async (id, updatedFields) => {
    const issueDocRef = doc(db, "Issues", id);
    await updateDoc(issueDocRef, updatedFields);
  }

  return { updateIssue };
}

export default useUpdateIssue;
