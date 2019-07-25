import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    upload(e) {
        // console.log('upload click!');
        let file = e.target.files[0];
        // console.log("file", file);
        let formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData)
            .then(({data}) => {
                if(data.success) {
                    this.props.done(data.data);
                    // self.props.onChange(data.url);
                    // console.log("data", data);
                    // console.log("data.data", data.data);
                } else {
                    console.log('upload fail');
                }
            })
            .catch(function(err) {
                console.log('err in upload(e):',err);
            });
    }

    close(e) {
        // e.preventDefault();
        console.log('closebtn!!', e);
        // this.setState = { uploaderIsVisible: false };        
    }


    render() {
        return (
            <div className="modal">
                <h1>Would you like to change your profile image?</h1>
                <input onChange={ e => this.upload(e) }
                    name='file'
                    type='file'
                    id="file"
                    className="inputfile"
                    accept='image/*'
                />
                <label htmlFor="file">Upload</label>
                <button className="close-btn" onClick={ e => this.close(e) }>Close</button>
            </div>
        );
    }
}
