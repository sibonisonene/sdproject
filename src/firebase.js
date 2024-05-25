import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD7bqbBYF6vswJWTLG9TZP4du5fWwknP5g",
  authDomain: "auth-development-e8593.firebaseapp.com",
  projectId: "auth-development-e8593",
  storageBucket: "auth-development-e8593.appspot.com",
  messagingSenderId: "609545899114",
  appId: "1:609545899114:web:b69ddea4f37095ddc88e13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Functions
const functions = getFunctions(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Messaging
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registered:', registration);

    const token = await getToken(messaging, { vapidKey: 'DxShMSWrVvV-l_7oMcDgopZLbssQw-kfnwhmo1DFJeUw4uxkTExeEb526sGSm0SY1DEUqim3VE4906fNQkAS6I', serviceWorkerRegistration: registration });
    if (token) {
      console.log('Notification permission granted. Token:', token);
      return token;
    } else {
      console.error('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (error) {
    console.error('Unable to get permission to notify.', error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
});

// Function to add admin role to a user
export const addAdminRole = async (email) => {
  const addRoleFn = httpsCallable(functions, 'addAdminRole');
  try {
    const result = await addRoleFn({ email });
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Function to remove admin role from a user
export const removeAdminRole = async (email) => {
  const removeRoleFn = httpsCallable(functions, 'removeAdminRole');
  try {
    const result = await removeRoleFn({ email });
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (email) => {
  const deleteUserFn = httpsCallable(functions, 'deleteUser');
  try {
    const result = await deleteUserFn({ email });
    return result.data;
  } catch (error) {
    throw error;
  }
};
