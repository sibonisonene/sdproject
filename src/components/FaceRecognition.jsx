/* global faceapi */

import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';


// Firebase configuration
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
      for (const itemRef of res.items) {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        imageUrls.push({ url, name: metadata.name });
      }
      console.log('Loaded images:', imageUrls);
      setImages(imageUrls);
    };

    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      console.log('Models loaded');
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          console.log('Video started');
        })
        .catch((err) => console.error('Error accessing webcam:', err));
    };

    loadModels().then(() => {
      loadImages();
      startVideo();
    });

  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || images.length === 0) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    video.addEventListener('play', async () => {
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const labeledFaceDescriptors = await Promise.all(images.map(async (image) => {
        const img = await faceapi.fetchImage(image.url);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        const descriptors = [detections.descriptor];
        return new faceapi.LabeledFaceDescriptors(image.name, descriptors);
      }));

      console.log('Labeled face descriptors:', labeledFaceDescriptors);

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        console.log('Detections:', detections);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
        console.log('Results:', results);

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
          drawBox.draw(canvas);
        });
      }, 100);
    });

  }, [images]);

  return (
    <div className="face-recognition-container">
      <video id="video" className="face-recognition-video" width="1000" height="720" autoPlay muted ref={videoRef}></video>
      <canvas ref={canvasRef} className="face-recognition-canvas"></canvas>
    </div>
  );
};

export default FaceRecognition;
