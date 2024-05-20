// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import React, { useState } from 'react';
// import { getFunctions, httpsCallable } from 'firebase/functions';
// import App from "../../App";

// const AddAdmin = () => {
//     const [email, setEmail] = useState('');

//     // Initialize Firebase Functions
//     const functions = getFunctions();

//     const handleAddAdmin = async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         const addAdminRole = httpsCallable(functions, 'addAdminRole');
//         try {
//             const result = await addAdminRole({ email });
//             alert(result.data.message); // Display success message from Firebase function
//         } catch (error) {
//             alert(`Error: ${error.message}`); // Error handling
//         }
//     };

//     return (
//         <div className="make-admin-modal">
//             <form onSubmit={handleAddAdmin}>
//                 <h2>Make Admin</h2>
//                 <input
//                     type="text"
//                     placeholder="Enter user email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit" className="make-admin-button">Make Admin</button>
//             </form>
//         </div>
//     );
// };

// export default AddAdmin;

import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const [action, setAction] = useState('add'); // State variable to toggle between add and remove

    // Initialize Firebase Functions
    const functions = getFunctions();

    const handleAction = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Determine the function to call based on the current action
        const actionFunction = action === 'add' ? 'addAdminRole' : 'removeAdminRole';
        const adminRoleFn = httpsCallable(functions, actionFunction);

        try {
            const result = await adminRoleFn({ email });
            alert(result.data.message); // Display success message from Firebase function
        } catch (error) {
            alert(`Error: ${error.message}`); // Error handling
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
