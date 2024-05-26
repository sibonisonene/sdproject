import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { setDoc, doc } from 'firebase/firestore'; 
import useAddProfile from '../hooks/useAddProfile';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+27");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [surname, setSurname] = useState('');
  const { addProfile } =  useAddProfile();

  const signUp = (e) => {
    e.preventDefault();
    addProfile({fullName, surname, email, phoneNumber, address})
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push("/components/Dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Register a new user</h1>
        <p>FULL NAME *</p>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <p>SURNAME *</p>
        <input
          type="text"
          placeholder="Enter your surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <p>EMAIL ADDRESS *</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>Phone number *</p>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <p>Address *</p>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;