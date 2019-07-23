//image
import React from 'react';
import Registration from './registration';

export default class Welcome extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h1>Connect with your Mates :)</h1>
                <img src= "/images/line.png" width = "700px"/>
                <Registration />
            </div>
        );
    }
}
