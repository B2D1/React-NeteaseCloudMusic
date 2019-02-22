import './index.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import Header from '../../components/Header';
import Slide from '../../components/Slide';
import SlideStore from '../../store/slide';

const slideStore = new SlideStore();

@observer
class Discover extends React.Component {
    public state = { recommend: true };
    public activeRadio = () => {
        this.setState({
            recommend: false,
        });
    };
    public activeRecommend = () => {
        this.setState({
            recommend: true,
        });
    };
    public render() {
        return (
            <React.Fragment>
                <Header />
                <div className='discover-sticky'>
                    <div className='discover-switch'>
                        <span onClick={() => this.activeRecommend()}>
                            个性推荐
                        </span>
                        <span onClick={() => this.activeRadio()}>主播电台</span>
                    </div>
                    <div
                        className='switch-bar'
                        style={{
                            left: this.state.recommend ? '25%' : '75%',
                        }}
                    />
                </div>
                <div className='discover-slide'>
                    <Slide slide={slideStore} />
                </div>
            </React.Fragment>
        );
    }
}

export default Discover;
