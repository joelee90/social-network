import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    login(e) {
        e.preventDefault();
        axios.post('/login', {
            email: this.email,
            password: this.password
        })
            .then(
                ({data}) => {
                    if(data.login) {
                        location.replace('/');
                    } else {
                        this.setState({
                            error : true
                        });
                    }
                }
            )
            .catch(err => {
                console.log("err in login btn", err);
            });
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    { this.state.error && <div className="error">Wrong Email and Password! Try again!</div> }
                </div>
                <form className="login-container">
                    <input type="text" name="email" placeholder="email" onChange={ e => this.handleChange(e) } required/>
                    <input type="password"  name="password" placeholder="password" onChange={ e => this.handleChange(e) } required/>
                    <button onClick={ e => this.login(e) }>Login</button>
                </form>
            </div>
        );
    }
}
