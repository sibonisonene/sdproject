import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const useUpdateProfile = () => {
    const profileCollectionReference = collection(db, "Profiles");

    const updateProfile = async (email, updatedFields) => {
        
        const q = query(profileCollectionReference, where("email", "==", email));

        
        const querySnapshot = await getDocs(q);

        
        querySnapshot.forEach(async (profileDoc) => {
            const profileDocRef = doc(db, "Profiles", profileDoc.id);
            await updateDoc(profileDocRef, updatedFields);
        });
    }

    return { updateProfile };
}

export default useUpdateProfile;
