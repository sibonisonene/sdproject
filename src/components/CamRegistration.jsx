// WebcamRegistration.js
import React, { useRef, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7bqbBYF6vswJWTLG9TZP4du5fWwknP5g",
    authDomain: "auth-development-e8593.firebaseapp.com",
    projectId: "auth-development-e8593",
    storageBucket: "auth-development-e8593.appspot.com",
    messagingSenderId: "609545899114",
    appId: "1:609545899114:web:b69ddea4f37095ddc88e13"
  };
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const WebcamRegistration = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [name, setName] = useState('');
  const [imageDataURL, setImageDataURL] = useState('');

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    initWebcam();
  }, []);

  const handleRegister = async () => {
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const imageDataURL = canvasRef.current.toDataURL('image/png');
    setImageDataURL(imageDataURL);

    // Convert data URL to Blob
    const response = await fetch(imageDataURL);
    const blob = await response.blob();

    const imageRef = ref(storage, `images/${name}.png`);
    await uploadBytes(imageRef, blob);
    console.log('Image uploaded to Firebase Storage.');
  };

  return (
    <div>
      <h1>Webcam Registration</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <video ref={videoRef} width="640" height="480" autoPlay></video>
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>
      {imageDataURL && <img src={imageDataURL} alt="Captured" />}
    </div>
  );
};

export default WebcamRegistration;
