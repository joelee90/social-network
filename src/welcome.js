//image
import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom'; //Switch also possible
//Link needs to be contained by router
export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Connect with your Mates :)</h1>
                <img src= "/images/line.png" width = "700px"/>

                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} /> 
                    </div>
                </HashRouter>

            </div>
        );
    }
}

//HashRouter can contain anything, anywhere.
