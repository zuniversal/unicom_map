import {Component} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import SignIn from './SignIn';
import Scene from '../Index';

export default class NewRoute extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/scene/:scene">
                        <Scene />
                    </Route>
                    <Route path="/">
                        <SignIn />
                    </Route>
                </Switch>
            </div>
        );
    }
}
