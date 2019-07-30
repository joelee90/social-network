//image
import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom'; //Switch also possible
//Link needs to be contained by router
export default class Welcome extends React.Component {
    render() {
        return (
            <div className="mainpage">
                <h1>Connect with your Mates :)</h1>
                <img src= "/images/line.png" style = {{ width: "700px", margin: "20px"}}/>

                <HashRouter>
                    <div style = {{margin: "20px"}}>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>

            </div>
        );
    }
}

//HashRouter can contain anything, anywhere.
