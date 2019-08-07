import React from "react";
import FriendButton from "./friendbutton";
import Wall from "./wall";
import axios from './axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            const {id} = this.props.match.params;
            const {data} = await axios.get(`/api/user/${id}`);
            // const data = response.data; same as above.
            // console.log("data", data);
            // console.log("id", id);
            if(data.sameUser) {
                this.props.history.push('/');
            } this.setState( data );
        } catch (err) {
            console.log("err other profile", err);
        }

        try {
            const {id} = this.props.match.params;
            const {data} = await axios.get(`/userwall/${id}`);
            // console.log(data);
        }catch (err) {
            console.log("err in wall", err);
        }
    }

    render() {
        return (
            <div className="bioeditor-container-large">
                <div className="bioeditor-container">
                    <div className="propic">
                        <img src = {this.state.url} />
                        <FriendButton OtherProfileId={this.props.match.params.id}/>
                    </div>
                    <div className="nameandbio">
                        <h2> {this.state.firstname} {this.state.lastname} </h2>
                        <div className="bioedit"> {this.state.bio} </div>
                    </div>
                </div>
                <Wall OtherId = {this.props.match.params.id}/>
            </div>
        );
    }
}
