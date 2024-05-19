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
});