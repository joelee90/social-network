import React from 'react';

export default class Uploader extends React.Component {
    render() {
        return (
            <div className="modal">
                <h1>Want to change your profile image?</h1>
                <button onClick={ e => this.upload(e) }>Upload</button>
            </div>
        );
    }
}
