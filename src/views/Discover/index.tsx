import './index.scss';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import DiscoverAPI from '../../api/discover';
import IconArrow from '../../assets/icon/arrow.svg';
import IconPlay from '../../assets/icon/play.svg';
import IconRadio from '../../assets/icon/radio.svg';
import IconRankList from '../../assets/icon/rankList.svg';
import IconRecommend from '../../assets/icon/recommend.svg';
import IconSongList from '../../assets/icon/songList.svg';
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
                <IconRadio width={25} height={25} fill='#FFF' />
              </div>
              <span>私人FM</span>
            </li>
            <li>
              <div>
                <IconRecommend width={25} height={25} fill='#FFF' />
              </div>
              <span>每日推荐</span>
            </li>
            <li>
              <div>
                <IconSongList width={25} height={25} fill='#FFF' />
              </div>
              <span>歌单</span>
            </li>
            <li>
              <div>
                <IconRankList width={25} height={25} fill='#FFF' />
              </div>
              <span>排行榜</span>
            </li>
          </ul>
        </div>
        <div className='container'>
          <div className='rec-songList disc-block'>
            <div className='disc-block-title'>
              <span>推荐歌单</span>
              <IconArrow width={15} height={15} fill='#333' />
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
                      <IconPlay width={10} height={10} fill='#FFF' />
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
