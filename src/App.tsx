import './App.scss';

import * as React from 'react';

import Footer from './components/Footer';
import Video from './views/Video';
import Discover from './views/Discover';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact={true}>
                        <Discover />
                    </Route>
                    <Route path='/video'>
                        <Video />
                    </Route>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
