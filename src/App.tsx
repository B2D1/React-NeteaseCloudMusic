import './App.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import HomeStore from './store/home';

interface IApp {
    homeStore?: any;
}

const homeStore = new HomeStore();

@observer
class App extends React.Component<IApp> {
    public componentDidMount() {
        homeStore.fetchBanner();
    }
    public render() {
        return (
            <div>
                {homeStore.banner.map((v, i) => (
                    <img src={v.imageUrl} />
                ))}
            </div>
        );
    }
}

export default App;
