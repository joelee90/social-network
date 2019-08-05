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
    //user's original text is kept before making any changes.

    handleChange(e) {
        // console.log("keyboard", e );
        // console.log("e.target.value", e.target.value);
        this.setState({
            newBio : e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        // console.log("save!!", e);
        axios.post('/bio', {
            bio: this.state.newBio
        })
            .then(({ data }) => {
                // console.log("data", data);
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

                {this.state.editing && (
                    <div>
                        <textarea
                            value = {this.state.newBio}
                            name="draftBio"
                            cols="50"
                            rows="10"
                            onChange = {e => this.handleChange(e)}
                        />
                        < br/>
                        <button onClick={ e => this.submit(e) }>Save</button>
                    </div>
                )}

                {this.props.bio && !this.state.editing && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick = {() => this.setState({ editing:true })}> Edit your bio! </button>
                    </div>
                )}

                {!this.props.bio && !this.state.editing && (
                    <button onClick = {() => this.setState({ editing:true })}> Add your bio! </button>
                )}



            </div>
        );
    }
}
