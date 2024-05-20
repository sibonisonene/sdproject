import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const useUpdateProfile = () => {
    const profileCollectionReference = collection(db, "Profiles");

    const updateProfile = async (email, updatedFields) => {
        // Create a query against the collection.
        const q = query(profileCollectionReference, where("email", "==", email));

        // Get the documents that match the query.
        const querySnapshot = await getDocs(q);

        // Iterate through the documents and update them.
        querySnapshot.forEach(async (profileDoc) => {
            const profileDocRef = doc(db, "Profiles", profileDoc.id);
            await updateDoc(profileDocRef, updatedFields);
        });
    }

    return { updateProfile };
}

export default useUpdateProfile;
