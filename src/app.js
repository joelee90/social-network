import React from 'react';
import Uploader from './uploader';
import ProfilePic from './profilepic';
import axios from './axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get('/user');
        // console.log("data.user", data.user);
        this.setState(
            data.user
        );
    }
    render() {

        return (
            <div>

                <header className="headerapp">
                    <img src= "/images/line.png"  alt="Line" width = "200px" />
                    <div className="userimg">
                        <ProfilePic
                            url = {this.state.url}
                            firstname = {this.state.firstname}
                            lastname = {this.state.lastname}
                            onClick = { () => this.setState({ uploaderIsVisible: true }) }
                        />
                    </div>
                </header>

                { this.state.uploaderIsVisible &&
                    <Uploader onClick done={ url => this.setState({url, uploaderIsVisible: false }) }/>
                // <Uploader onClick = { () => this.setState({ uploaderIsVisible: false }) } />
                }
            </div>
        // { this.state.uploaderIsVisible &&
        // // <Uploader done={ url => this.setState({url, uploaderIsVisible: false }) }/>
        // <Uploader onClick = { onClick => this.setState({ onClick, uploaderIsVisible: false }) } />
        // }


        );
    }
}


//state -- display changes, when there is going to be change.
//{this} - when false, doesn't show, when true show <Uploader> conditional content
//<ProfilePic> always present
//alt for image
//react - sibling can't communicate,
//lifting state up --> img url(state can change), --> uploader can change state
//app needs to function as container , changes made through app.
//make route /user - db query to get user information, (first, last, img-url, bio)
//add 2 column to user's table. (bio, img url),
//get user info and send back(except email,pass)
//

//app - container component

// if(!this.state.id) {
//     return null; //<div>Loading...</div>
// }
