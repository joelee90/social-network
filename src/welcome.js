//image
import React from 'react';
import Registration from './registration';

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to</h1>
                <img src= "/images/line.png" />
                <Registration />
            </div>
        );
    }
}
