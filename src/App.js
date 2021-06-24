import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.less';
import SceneIndex from './page/scene/Index';
import SignIn from './page/scene/login/SignIn';
import mediaQuery from './mediaQuery';
const App = () => {
    return (
        <Router basename='/nrvp'>
            <Switch>
                <Route path="/scene/:scene" component={SceneIndex} />
                <Route path="/" component={SignIn} />
            </Switch>
        </Router>
    );
};

export default mediaQuery()(App);
