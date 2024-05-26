import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import AuthDetails from '../AuthDetails';
import { auth } from '../../firebase';

const useDeleteProfile = () => {
    const profileCollectionReference = collection(db, "Profiles");
    const email = auth.currentUser.email;

    const deleteProfile = async (email) => {
        
        const q = query(profileCollectionReference, where("email", "==", email));

        
        const querySnapshot = await getDocs(q);

        
        querySnapshot.forEach(async (profileDoc) => {
            const profileDocRef = doc(db, "Profiles", profileDoc.id);
            await deleteDoc(profileDocRef);
        });
    }

    return { deleteProfile };
}

export default useDeleteProfile;
