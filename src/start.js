import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';


let elem;

if(location.pathname == '/welcome') {
    //loggedout
    elem = <Welcome />;
} else {
    //loggedin
    elem = <img src= "/images/line.png"  width = "300px" />;
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
