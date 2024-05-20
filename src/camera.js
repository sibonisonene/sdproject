import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, listAll } from "firebase/storage";
import { useState } from React;


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

const video =  document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

function loadImages() {
    const [images, setImages] = useState([]);
    const imageListRef = ref(storage, 'images/');
    listAll(imageListRef).then((res) => {
        res.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url) => {
                let item;
                item.url = url
                itemRef.getMetadata().then((metadata) => {
                    item.name = metadata.name
                    setImages((images) => [...images, item]);
                });
            });
        });
    })
    return Promise.all(
        images.map(async image => {
            const descriptions = []
            const img = await faceapi.fetchImage(image.url)
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            descriptions.push(detections.descriptor)
            return new faceapi.LabeledFaceDescriptors(image.name, descriptions)
        })
        
    )
}

video.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    const LabeledFaceDescriptors = await loadImages()
    const FaceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        console.log(detections)
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        const results = resizedDetections.map(d => FaceMatcher.findBestMatch(d.descriptor))
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
            drawBox.draw(canvas)
        }
        )
    }, 100)
})