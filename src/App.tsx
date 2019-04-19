import './App.scss';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Discover from './views/Discover';
import SongSheet from './views/SongSheet';
import Video from './views/Video';

import './assets/iconfont';


class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact={true} component={Discover} />
          <Route path='/songsheet/:id' exact={true} component={SongSheet} />
          <Route path='/video' exact={true} component={Video} />
        </Switch>
        <Route path='/' component={Footer} />
      </div>
    );
  }
}

export default App;
