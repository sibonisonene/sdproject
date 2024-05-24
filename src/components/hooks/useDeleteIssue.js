import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const useDeleteIssue = () => {
  const deleteIssue = async (id) => {
    const issueDocRef = doc(db, "Issues", id);
    await deleteDoc(issueDocRef);
  }

  return { deleteIssue };
}

export default useDeleteIssue;
