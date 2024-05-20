import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import AuthDetails from '../AuthDetails';
import { auth } from '../../firebase';

const useDeleteProfile = () => {
    const profileCollectionReference = collection(db, "Profiles");
    const email = auth.currentUser.email;

    const deleteProfile = async (email) => {
        // Create a query against the collection.
        const q = query(profileCollectionReference, where("email", "==", email));

        // Get the documents that match the query.
        const querySnapshot = await getDocs(q);

        // Iterate through the documents and delete them.
        querySnapshot.forEach(async (profileDoc) => {
            const profileDocRef = doc(db, "Profiles", profileDoc.id);
            await deleteDoc(profileDocRef);
        });
    }

    return { deleteProfile };
}

export default useDeleteProfile;
