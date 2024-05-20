import { addDoc, collection} from 'firebase/firestore'
import { db } from '../../firebase';

const useAddProfile = () => {

    const profileCollectionReference = collection(db, "Profiles");

    const addProfile = async ({
        fullName,
        surname,
        email,
    }) => {
        await addDoc(profileCollectionReference, {
            userID: "",
            fullName,
            surname,
            email,
        })
    }

    return { addProfile };
}
 
export default useAddProfile;