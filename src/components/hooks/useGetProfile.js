import { collection, onSnapshot, query, where } from "firebase/firestore";
import AuthDetails from "../AuthDetails";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const useGetProfile = () => {

    const[profile, setProfile] = useState([]);
    const profileCollectionReference = collection(db, "Profiles");
    const email = auth.currentUser.email;
    const getProfile = async () => {
        let unsubscribe;
        try{
            const queryProfiles = query(profileCollectionReference, where("email", "==", email))

            unsubscribe = onSnapshot(queryProfiles, (snapshot) => {
                let docs = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id})
                })
                setProfile(docs)
            })

        } catch(err) {console.error(err)}

        return () => unsubscribe();
    }

    useEffect(() => {
        getProfile()
    }, [])


    return { profile };
}
 
export default useGetProfile;



