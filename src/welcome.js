//image
import React from 'react';
import Registration from './registration';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="mainpage">
                <img src= "/images/home.png"/>
                <img src= "/images/line.png" style = {{ width: "200px"}}/>
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
