//need state, if user submits registration, if error --> update to show error, reason why
//state is needed. use default when one

import React from 'react';

import axios from './axios';

import { HashRouter, Route, Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }

    submit(e) {
        e.preventDefault();
        axios.post('/registration', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
        }).
            then(
                ({data}) => {
                    if(data.success) {
                        location.replace('/');
                    } else {
                        this.setState({
                            error : true
                        });
                    }
                }
            )
            .catch(err => {
                console.log("err in reg.js submit", err);
            });
    }
    render() {
        return (
            <div className="regi-container-large">
                <div>
                    { this.state.error && <div className="error">Oops! Please try again!</div> }
                </div>
                <form className="regi-container">
                    <input type="text" name="firstname" placeholder="first name" onChange={ e => this.handleChange(e) } required />
                    <input type="text" name="lastname" placeholder="last name" onChange={ e => this.handleChange(e) } required/>
                    <input type="text" name="email" placeholder="email" onChange={ e => this.handleChange(e) } required/>
                    <input type="password"  name="password" placeholder="password" onChange={ e => this.handleChange(e) } required/>
                    < br/>
                    <button className="regi-btn" variant="secondary" size="lg" onClick={ e => this.submit(e) }>Register</button>
                </form>
                <div className="alreadymember">
                    <div>
                        <h2 style = {{color: "#2A433B"}}> Already a member? <Link to = "/login" style = {{textDecoration: "none", color: "#18A558"}}>Log in</Link> </h2>
                    </div>
                </div>
            </div>
        );
    }
}
