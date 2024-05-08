import { useState } from 'react';
import '../index.css';

function Maintenance() {
  
  //Get the issues from database
  //Used stub:
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Leak",
      resident: 34,
      date: "23 March 2024",
      status: "pending",
      Feedback: "We do not see the leak",
      Description: "There is a leak in the hallway of the 3rd floor"
    },
    {
      id: 2,
      title: "Broken light",
      resident: 34,
      date: "23 March 2024",
      status: "pending",
      Feedback: "We will fix it next Month",
      Description: "One of the lights in the second elevator is not working. It keeps flashing"
    }
  ]);

  
  //When you click status button
  const statusClick = (id) => {
    let issue;
    issues.forEach(element => {
      if(element.id ===id){
        issue = element;
      }
    });
    let newIssues = issues.filter(i => i.id !==id);
    if(issue.status === "pending"){
      issue.status = "fixing";
    }
    else if(issue.status === "fixing"){
      issue.status = "fixed";
    }
    else if(issue.status === "fixed"){
      issue.status = "pending";
    }
    newIssues.push(issue);

    setIssues(newIssues);
    console.log(issues);

  }

  //When you click Add Feedback
  const feedbackClick = ( e) => {

    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    let issue = Object;
    issues.forEach(element => {
      if(element.id ===Number(Object.keys(formJson)[0])){
        issue = element;
      }
    });


    issue.Feedback = Object.values(formJson)[0];
    let newIssues = issues.filter(i => i.id !==Number(Object.keys(formJson)[0]));

     newIssues.push(issue);

     setIssues(newIssues);
     console.log(issues);
    
  }


  return (
    
    <article className="IssuesAdmin" data-testid="IssuesAdmin">
      <h1>Issues</h1>

      {
        //Perform necassary logic operations

        //add each items html to another html item
        issues.map((issue) => {
          return <section className='IssueItem' key={issue.id}>
            <section className='IssueHead'>
              <h2>{issue.title}</h2>
              <h3>#{issue.id}</h3>
              <h4>Logged by resident: {issue.resident}</h4>
            </section>
            <section className='Status'>
              <p data-testid='Status'>Status: {issue.status}</p>
              <button onClick={() => {statusClick(issue.id)}}>Change Status</button>
            </section>
            <p>Description: {issue.Description}</p>
            <form className='Feedback' onSubmit={feedbackClick }>
              <label>Feedback: <input name={issue.id} defaultValue={issue.Feedback} data-testid='Feedback'></input> </label>
              <button type='submit'>Add Feedback</button>
            </form>
          </section>
        })
        /* display the results (by adding the html item)*/
      
      }

    </article>
  );
}

export default Maintenance;
