import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

//release resources after each test
afterEach(() => {
    cleanup();
});

global.TextEncoder = require('util').TextEncoder;

//test if the componant is rendered
test('app component should be in the document', () => {
    render(<App/>);
    const app = screen.getByTestId('IssuesAdmin');
    //Check if app is in the body of the document
    expect(app).toBeInTheDocument();
});

// //test if status update works
// test('statusClick_anyState_buttonClick', () => {
//     render(<App/>);
//     const oldState = screen.getByTestId("Status");
//     //Click the button
//     const newState = screen.getByTestId('Status');
//     expect(oldState).not.toBe(newState);
// });

// //test if status update works
// test('feebackClick_anyState_buttonClick', () => {
//     render(<App/>);
//     //onClick
//     const oldFeedback = screen.getByTestId('Feedback');

//     //afterClick check with the database
//     const newFeedback = screen.getByTestId('Feedback');
//     expect(oldFeedback).toBe(newState);
// });


//test if feedback update works


//IMPORTANT change the import App to the component name