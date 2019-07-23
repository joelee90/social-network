import React from 'react';
import AnimalsContainer from './index';
import HelloWorld from './start';
import axios from 'axios';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            cute: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('/get-animal').then(resp => {
            // console.log("resp", resp);
            this.setState({
                name: resp.data.name,
                cute: resp.data.cute
            });
            console.log('this.state:', this.state);
        });
    }

    handleChange(e) {
        console.log("e.target.name", e.target.name);
        this.setState({
            // name : e.target.value
            [e.target.name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log("this.state", this.state);
    }

    render() {
        return (
            <div>

                <AnimalsContainer
                    name = { this.state.name }
                    cute = { this.state.cute }
                />
                <HelloWorld />
                <form>
                    <input
                        type='text'
                        name='name'
                        onChange = {this.handleChange}/>
                    <input
                        type='text'
                        name='cute'
                        onChange = {this.handleChange}/>

                    <button onClick = {this.handleClick}>submit</button>
                </form>
            </div>
            
        );
    }
}
