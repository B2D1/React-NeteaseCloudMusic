import './App.scss';

import * as React from 'react';

import Discover from './views/Discover';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Discover />
            </div>
        );
    }
}

export default App;
