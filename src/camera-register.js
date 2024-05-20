import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7bqbBYF6vswJWTLG9TZP4du5fWwknP5g",
  authDomain: "auth-development-e8593.firebaseapp.com",
  projectId: "auth-development-e8593",
  storageBucket: "auth-development-e8593.appspot.com",
  messagingSenderId: "609545899114",
  appId: "1:609545899114:web:b69ddea4f37095ddc88e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Get necessary elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const registerButton = document.getElementById('registerButton');
const nameInput = document.getElementById('name');

// Access the webcam
async function initWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing webcam:', err);
  }
}

// Initialize webcam
initWebcam();

// Register button click event
registerButton.addEventListener('click', async () => {
  // Ensure a name is entered
  if (!nameInput.value.trim()) {
    alert('Please enter your name.');
    return;
  }

  // Draw the current video frame on the canvas
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  
  const imageDataURL = canvas.toDataURL('image/png');

 
  console.log('Name:', nameInput.value);
  console.log('Image Data:', imageDataURL);

  
  const capturedImage = new Image();
  capturedImage.src = imageDataURL;
  document.body.appendChild(capturedImage);

  const imageRef = ref(storage, `images/${nameInput.value}.png`);
  await uploadBytes(imageRef, capturedImage.src);
  
});