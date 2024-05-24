import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push('/components/Dashboard');
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Invalid Email or Password', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          style: {
            minWidth: '600px',
            maxWidth: '500px',
            height: '30px',
            padding: '0px',
            fontSize: '16px',
            width: '100px',
          },
        });
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In</h1>
        <p>EMAIL ADDRESS *</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>PASSWORD *</p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset it here</Link>
        </p>
      </form>
      <ToastContainer className="toast" />
    </div>
  );
};

export default SignIn;
