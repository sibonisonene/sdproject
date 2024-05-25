import React, { useRef, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import * as faceapi from 'face-api.js';

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

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia(
        { video: {} },
        stream => videoRef.current.srcObject = stream,
        err => console.error(err)
      );
    };

    loadModels();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const imageListRef = ref(storage, 'images/');
      const imageList = await listAll(imageListRef);
      const images = await Promise.all(
        imageList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const img = await faceapi.fetchImage(url);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          return new faceapi.LabeledFaceDescriptors(itemRef.name, [detections.descriptor]);
        })
      );
      setLabeledFaceDescriptors(images);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const handlePlay = async () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      document.body.append(canvas);
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const results = resizedDetections.map(d => labeledFaceDescriptors.length > 0 ? new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6).findBestMatch(d.descriptor) : null);
        results.forEach((result, i) => {
          if (result) {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
            drawBox.draw(canvas);
          }
        });
      }, 100);
    };

    videoRef.current && videoRef.current.addEventListener('play', handlePlay);
  }, [labeledFaceDescriptors]);

  return (
    <div>
      <h1>Face Recognition</h1>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ position: 'absolute' }}></canvas>
    </div>
  );
};

export default FaceRecognition;
