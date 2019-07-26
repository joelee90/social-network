import React from "react";
import axios from "./axios";

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    componentDidMount() {
        this.setState((state, props) => ({ newBio : props.bio }));
    }

    handleChange(e) {
        // console.log("keyboard", e );
        console.log("e.target.value", e.target.value);
        this.setState({
            newBio : e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        console.log("save!!", e);
        axios.post('/bio', {
            bio: this.state.newBio
        })
            .then(({ data }) => {
                console.log("data", data);
                this.setState({ editing:false });
                this.props.setBio(data.bio);
            })
            .catch(err => {
                console.log("err in add bio btn", err);
            });
        //value takeover old value
    }

    render() {
        return (
            <div>
                <h2>Add your bio now!</h2>

                {this.state.editing && (
                    <div>
                        <textarea
                            value = {this.state.newBio}
                            name="draftBio"
                            cols="30"
                            rows="10"
                            onChange = {e => this.handleChange(e)}
                        />
                        <button onClick={ e => this.submit(e) }>Save</button>
                    </div>
                )}

                {this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick = {() => this.setState({ editing:true })}> Edit your bio! </button>
                    </div>
                )}

                {!this.props.bio && (
                    <button onClick = {() => this.setState({ editing:true })}> Add your bio! </button>
                )}

            </div>
        );
    }
}


// <p>{this.props.bio}</p>;
// {!this.state.editing && (
//     <button onClick = { this.setState({ editing:true })}> Add your bio! </button>
// )}