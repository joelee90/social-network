import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';


// let elem;
//
// if(location.pathname == '/welcome') {
//     //loggedout
//     elem = <Welcome />;
// } else {
//     //loggedin
//     elem = <img src = "./line.png" />;
// }

ReactDOM.render(
    <Welcome />,
    document.querySelector('main')
);
