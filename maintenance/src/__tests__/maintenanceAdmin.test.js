import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

test('app component should be in the document', () => {
    render(<App/>);
    const app = screen.getByTestId('App');
    //Check if app is in the body of the document
    expect(app).toBeInTheDocument();
});


