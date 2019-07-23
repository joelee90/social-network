//class components have states.
//function components don't.

import React from 'react';

export default function AnimalsContainer(props) {
    return (
        <div>
            <h1>(2) { props.name }'s are { props.cute }</h1>
        </div>
    );
}

export default class AnimalsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('this.props.name', this.props.name);
        console.log('this.props.cute', this.props.cute);
        return (
            <div>
                <h1>2 { this.props.name }'s are { this.props.cute }</h1>
            </div>
        );
    }
}
