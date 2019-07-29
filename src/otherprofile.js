import React from "react";
import axios from './axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            const {data} = await axios.get(`/user/${id}.json`);
            // const data = response.data; same as above.
            // console.log("data", data);
            // console.log("id", id);

            if(data.sameUser) {
                this.props.history.push('/');
            } else {
                this.setState( data );
            }

        } catch (err) {
            console.log("err otherprofile", err);
        }

    }

    render() {
        return (
            <div className="bioeditor-container">

                <div className="propic"> <img src = {this.state.url} /> </div>

                <div className="nameandbio">
                    <h2> {this.state.firstname} {this.state.lastname} </h2>
                    <div className="bioedit"> {this.state.bio} </div>
                </div>

            </div>
        );
    }
}

//reuse profile,

// /user/5
// /user/5
//
// works same as express route
// req.params.id
//
// react router :
// match (url to the component), params.
//
//
//
// will figureout bad id, see what response i get with bad user number.
//
// mount ,get the id, make axios request , put in data
// bc id is coming from url, 1. users can type anything, 2.
//
// issue : /user/10 --> /user/5 (link)
//
// const {a,b,c} = {
//     a: 1,
//     b: 2,
//     c: 3
// }
