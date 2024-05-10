import { render, screen, cleanup } from '@testing-library/react';
//import App from '../App';

//release resources after each test
afterEach(() => {
    cleanup();
});

global.TextEncoder = require('util').TextEncoder;

//test if the componant is rendered
//Componenet does not exist so we wont run the test

//Test for the text encoder
test('TextEncoder is globally defined in Jest', () => {
    expect(global.TextEncoder).toBeDefined();
  });

// test('app component should be in the document', () => {
//     render(<App/>);
//     const app = screen.getByTestId('FinesRes'); //Add the data-testid='' to the component
//     //Check if app is in the body of the document
//     expect(app).toBeInTheDocument();
// });


//IMPORTANT change the import App to the component name