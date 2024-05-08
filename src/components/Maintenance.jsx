import "./index.css";
import { useState } from "react";

function Maintenance() {

    //Get the issues from the database
    //Use stub
    const[fines, setFines] = useState([
        {
            id: 1,
            admin: 5,
            resident: 18,
            amount: 300,
            status: "Due",
            description: "Resident has been found smoking in a non-smoking area"
        },
        {
            id: 2,
            admin: 5,
            resident: 18,
            amount: 300,
            status: "Paid",
            description: "Resident has been found smoking in a non-smoking area"
        }
    ]);

    const createFine = () => {

    }


    return (
        <article className= "Maintenance" data-testid= "Maintenance">
            <h1>Your Fines</h1>
            <button onClick={createFine}>Create Fine</button>
            {
                fines.map((fine) => {
                    return <section className="FineItem" key={fine.id}>
                        <section>
                            <h2>{fine.description}</h2>
                            <h3>issued by: {fine.admin}</h3>
                        </section>
                        <button>Pay</button>
                    </section>
                   
                })
            }
        </article>
    )

}

export default Maintenance;