import './index.scss';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Icon from '../../components/Icon';

import DiscoverAPI from '../../api/discover';
import Header from '../../components/Header';
import Slide from '../../components/Slide';
import CommonStore from '../../store/common';
import SlideStore from '../../store/slide';
import { simplifyPlayCount } from '../../utils/math';

const discoverAPI = new DiscoverAPI();
const slideStore = new SlideStore();

interface IProps extends RouteComponentProps {
  commonStore: CommonStore;
}

@observer
@inject('commonStore')
class Discover extends React.Component<IProps> {
  public state = { recommend: true, recSongList: [] };
  public async componentDidMount() {
    const commonStore = this.props.commonStore!;
    commonStore.toggleTabBar(true);
    const res = await discoverAPI.fetchRecSongList();
    this.setState({
      recSongList: res.data.result
    });
  }
  public activeRadio = () => {
    this.setState({
      recommend: false
    });
  };
  public activeRecommend = () => {
    this.setState({
      recommend: true
    });
  };
  public goSongList = async (id: number) => {
    this.props.history.push(`/songsheet/${id}`);
  };
  public render() {
    const recSongList = this.state.recSongList.slice(0, 6);
    return (
      <React.Fragment>
        <Header />
        <div className='discover-sticky'>
          <div className='discover-switch'>
            <span onClick={() => this.activeRecommend()}>个性推荐</span>
            <span onClick={() => this.activeRadio()}>主播电台</span>
          </div>
          <div
            className='switch-bar'
            style={{
              left: this.state.recommend ? '25%' : '75%'
            }}
          />
        </div>
        <div className='discover-slide'>
          <Slide slide={slideStore} />
        </div>
        <div className='discover-tab'>
          <ul>
            <li>
              <div>
                <Icon iconName='#icon-diantaizhibo' fontSize={22} />
              </div>
              <span>私人FM</span>
            </li>
            <li>
              <div>
                <Icon iconName='#icon-rili' fontSize={22} />
              </div>
              <span>每日推荐</span>
            </li>
            <li>
              <div>
                <Icon iconName='#icon-jiarugedan' fontSize={22} />
              </div>
              <span>歌单</span>
            </li>
            <li>
              <div>
                <Icon iconName='#icon-paihangbang' fontSize={22} />
              </div>
              <span>排行榜</span>
            </li>
          </ul>
        </div>
        <div className='container'>
          <div className='rec-songList disc-block'>
            <div className='disc-block-title'>
              <span>推荐歌单</span>
              <Icon iconName='#icon-arrow-right-copy-copy' color='333' />
            </div>

            <div className='songList-container'>
              {recSongList.map((v: any, i: number) => (
                <div
                  className='songList-item'
                  key={i}
                  onClick={() => this.goSongList(v.id)}
                >
                  <div className='item-cover'>
                    <div className='item-playCount'>
                      <Icon iconName='#icon-play' fontSize={12} />
                      <span>{simplifyPlayCount(v.playCount)}</span>
                    </div>

                    <img src={v.picUrl} alt='' />
                  </div>
                  <span className='item-text'>{v.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Discover;
