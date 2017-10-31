import React, { Component, PropTypes } from 'react';
import { App, Home, Login, Register, Wall } from 'containers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/wall/:username" component={Wall}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Root;
