import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import User from './store';



ReactDOM.render(<App user={new User()} />, document.getElementById(
    'root'
) as HTMLElement);
registerServiceWorker();
