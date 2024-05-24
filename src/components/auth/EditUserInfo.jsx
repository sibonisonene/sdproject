import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useUpdateProfile from "../hooks/useUpdateProfile";

const EditUserINfo = () => {
  const [phoneNumber, setPhoneNumber] = useState("+27");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const { updateProfile } = useUpdateProfile();

  const handleUpdateProfile = async (event) => {
    event.preventDefault(); 
    try {
      const updatedFields = {
        phoneNumber,
        address,
      };
      await updateProfile(email, updatedFields);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleUpdateProfile}>
        <h1>Edit user info</h1>
        <p>User to change *</p>
        <input
          type="text"
          placeholder="Enter email of user to change"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>Phone number *</p>
        <input
          type="tel"
          placeholder="Enter new phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <p>Address *</p>
        <input
          type="text"
          placeholder="Enter new address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUserINfo;
