import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Dummy} from '../../src';

const App = class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Dummy></Dummy>
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('example')
);
