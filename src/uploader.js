import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    upload(e) {
        // e.preventDefault();
        console.log('yaa');
        // let self = this;
        let file = e.target.files[0];
        console.log("file", file);
        let formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData)
            .then(({data}) => {
                if(data.success) {
                    this.props.done(data.data);
                    // self.props.onChange(data.url);
                    console.log("data2222", data);
                    console.log("data222url2", data.data);
                } else {
                    console.log('upload fail');
                }
            })
            .catch(function(err) {
                console.log('err in POST/upload:',err);
            });

    }

    render() {
        return (
            <div className="modal">
                <h1>Want to change your profile image?</h1>


                <input onChange={ e => this.upload(e) }
                    name='file'
                    type='file'
                    id="file"
                    className="inputfile"
                    accept='image/*'/>
                <label htmlFor="file">Upload</label>

                <button onClick={ e => this.close(e) }>Close</button>


            </div>
        );
    }
}
