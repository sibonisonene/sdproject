import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const [action, setAction] = useState('add'); 

    
    const functions = getFunctions();

    const handleAction = async (event) => {
        event.preventDefault(); 

        const actionFunction = action === 'add' ? 'addAdminRole' : 'removeAdminRole';
        const adminRoleFn = httpsCallable(functions, actionFunction);

        try {
            const result = await adminRoleFn({ email });
            alert(result.data.message); 
        } catch (error) {
            alert(`Error: ${error.message}`); 
        }
    };

    return (
        <div className="admin-role-modal">
            <form onSubmit={handleAction}>
                <h2>{action === 'add' ? 'Make Admin' : 'Remove Admin'}</h2>
                <input
                    type="text"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="admin-role-button">
                    {action === 'add' ? 'Make Admin' : 'Remove Admin'}
                </button>
            </form>
            <Link 
                to="#" 
                onClick={() => setAction(action === 'add' ? 'remove' : 'add')} 
                className="switch-link"
            >
                {action === 'add' ? 'Switch to Remove Admin' : 'Switch to Add Admin'}
            </Link>
        </div>
    );
};

export default AddAdmin;
