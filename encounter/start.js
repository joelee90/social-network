import React from 'react';
import ReactDOM from 'react-dom';
import AnimalsContainer from './index';
import App from './app';

ReactDOM.render(
    <App />,
    document.querySelector('main')
);

export default function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
