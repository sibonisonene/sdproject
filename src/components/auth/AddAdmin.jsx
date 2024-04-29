import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import App from "../../App";

const AddAdmin = () => {
    const [email, setEmail] = useState('');

    // Initialize Firebase Functions
    const functions = getFunctions();

    const handleAddAdmin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const addAdminRole = httpsCallable(functions, 'addAdminRole');
        try {
            const result = await addAdminRole({ email });
            alert(result.data.message); // Display success message from Firebase function
        } catch (error) {
            alert(`Error: ${error.message}`); // Error handling
        }
    };

    return (
        <div className="make-admin-modal">
            <form onSubmit={handleAddAdmin}>
                <h2>Make Admin</h2>
                <input
                    type="text"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="make-admin-button">Make Admin</button>
            </form>
        </div>
    );
};

export default AddAdmin;
