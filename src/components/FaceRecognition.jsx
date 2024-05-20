import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll } from 'firebase/storage';
import * as faceapi from '../face-api.min.js';

const firebaseConfig = {
    apiKey: "AIzaSyD7bqbBYF6vswJWTLG9TZP4du5fWwknP5g",
    authDomain: "auth-development-e8593.firebaseapp.com",
    projectId: "auth-development-e8593",
    storageBucket: "auth-development-e8593.appspot.com",
    messagingSenderId: "609545899114",
    appId: "1:609545899114:web:b69ddea4f37095ddc88e13"
};

const FaceRecognition = () => {
  const [images, setImages] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const loadImages = async () => {
      const imageListRef = ref(storage, 'images/');
      const imageUrls = [];
      const res = await listAll(imageListRef);
      res.items.forEach(async (itemRef) => {
        const url = await itemRef.getDownloadURL();
        const metadata = await itemRef.getMetadata();
        imageUrls.push({ url, name: metadata.name });
      });
      setImages(imageUrls);
    };

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('models'),
      faceapi.nets.faceExpressionNet.loadFromUri('models')
    ]).then(() => {
      loadImages();
    });

    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));

  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    video.addEventListener('play', async () => {
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const LabeledFaceDescriptors = await loadImages();
      const FaceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map(d => FaceMatcher.findBestMatch(d.descriptor));
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
          drawBox.draw(canvas);
        });
      }, 100);
    });

  }, [videoRef.current, canvasRef.current, images]);

  return (
    <div>
      <video id="video" width="1000" height="720" autoPlay muted ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FaceRecognition;
