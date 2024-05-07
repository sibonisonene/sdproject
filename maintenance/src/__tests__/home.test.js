import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

//release resources after each test
afterEach(() => {
    cleanup();
});

//test if the componant is rendered
//Componenet does not exist so we wont run the test

test('app component should be in the document', () => {
    render(<App/>);
    const app = screen.getByTestId('Home'); //Add the data-testid='' to the component
    //Check if app is in the body of the document
    expect(app).toBeInTheDocument();
});


//IMPORTANT change the import App to the component name