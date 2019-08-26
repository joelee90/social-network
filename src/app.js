import React from 'react';
import Uploader from './uploader';
import ProfilePic from './profilepic';
import Profile from './profile';
import Bioeditor from './bioeditor';
import OtherProfile from './otherprofile';
import FindPeople from './findpeople';
import Friends from './friends';
import Chat from './chat';
import axios from './axios';
import Moment from './moment';
import Wall from "./wall";
import { Route, BrowserRouter, Link } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showBioeditor : false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get('/user');
        this.setState(
            data.user
        );
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header className="headerapp">
                            <img className = "headerlogo" src= "/images/line.png"  alt="Line" width = "80px" />
                            <ul>
                                <li><Link style = {{textDecoration: "none"}} to = "/">My Profile</Link></li>
                                <li><Link style = {{textDecoration: "none"}} to = "/users">Find People</Link></li>
                                <li><Link style = {{textDecoration: "none"}} to = "/friends">Mates</Link></li>
                                <li><Link style = {{textDecoration: "none"}} to = "/chat">Chat</Link></li>
                                <li><a style = {{textDecoration: "none"}} href = "/logout">Logout</a></li>
                            </ul>
                            <div className="userimg">
                                <ProfilePic
                                    url = {this.state.url}
                                    firstname = {this.state.firstname}
                                    lastname = {this.state.lastname}
                                    onClick = { () => this.setState({ uploaderIsVisible: true }) }
                                />
                            </div>
                        </header>

                        <div>
                            <Route exact path = "/" render = {() => {
                                return (
                                    <Profile
                                        firstname = {this.state.firstname}
                                        lastname = {this.state.lastname}
                                        profilepic = {
                                            <ProfilePic
                                                url = { this.state.url }
                                                firstname = { this.state.firstname }
                                                lastname = { this.state.lastname }
                                            />
                                        }
                                        bioeditor = {
                                            <Bioeditor
                                                onClick = { () =>
                                                    this.setState({ showBioeditor: true})
                                                }
                                                bio = { this.state.bio }
                                                setBio = { bio => this.setState({ bio : bio })}
                                            />
                                        }
                                    />
                                );
                            }} />

                            <Route path = "/user/:id" component = {OtherProfile} />
                            <Route path = "/users" component = {FindPeople} />
                            <Route path = "/friends" component = {Friends} />
                            <Route path = "/chat" component = {Chat} />

                        </div>
                    </div>
                </BrowserRouter>

                { this.state.uploaderIsVisible &&
                    <Uploader
                        onClick
                        done={ url => this.setState({url, uploaderIsVisible: false })}
                        close = {() => this.setState({ uploaderIsVisible: false})
                        }
                    />
                }

            </div>
        );
    }
}
