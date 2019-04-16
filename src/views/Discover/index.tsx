import './index.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import DiscoverAPI from '../../api/discover';
import IconArrow from '../../assets/icon/arrow.svg';
// import IconEarphone from '../../assets/icon/earphone.svg';
import IconPlay from '../../assets/icon/play.svg';
import IconRadio from '../../assets/icon/radio.svg';
import IconRankList from '../../assets/icon/rankList.svg';
import IconRecommend from '../../assets/icon/recommend.svg';
import IconSongList from '../../assets/icon/songList.svg';
import Header from '../../components/Header';
import Slide from '../../components/Slide';
import SlideStore from '../../store/slide';
import { simplifyPlayCount } from '../../utils/math';

const discoverAPI = new DiscoverAPI();
const slideStore = new SlideStore();

@observer
class Discover extends React.Component {
  public state = { recommend: true, recSongList: [] };
  public async componentDidMount() {
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
  public goPlayListDetail = async (id: number) => {
    const res = await discoverAPI.fetchPlayListDetail(id);
    const idArr = res.data.playlist.tracks.reduce((acc: number[], v: any) => {
      return acc.push(v.id), acc;
    }, []);
    const res2 = await discoverAPI.fetchSongDetail(idArr);
    console.log(res2);
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
                  onClick={() => this.goPlayListDetail(v.id)}
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
