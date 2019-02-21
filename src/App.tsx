import './App.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import User from './store';

interface IApp {
    user?: any;
}

@observer
class App extends React.Component<IApp> {
    public render() {
        const user: User = this.props.user;
        return (
            <div>
                Hello,{user.name}!
                <input
                    type='button'
                    value='change name'
                    onClick={e => user.fetchTodos()}
                />
            </div>
        );
    }
}

export default App;
