import './index.scss';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match, RouteComponentProps } from 'react-router-dom';

import DiscoverAPI from '../../api/discover';
import Icon from '../../components/Icon';
import CommonStore from '../../store/common';

const discoverAPI = new DiscoverAPI();

interface IProps extends RouteComponentProps {
  match: match<{ id: string }>;
  commonStore: CommonStore;
}
const initialState = {
  showMask: false,
  songList: [],
  playlistData: {
    playlist: {
      tags: [''],
      coverImgUrl: '',
      subscribedCount: '',
      description: '',
      name: '',
      shareCount: '',
      commentCount: '',
      tracks: [
        {
          name: '',
          ar: [
            {
              name: ''
            }
          ]
        }
      ],
      playCount: '',
      highQuality: false,
      creator: {
        avatarUrl: '',
        nickname: ''
      }
    }
  }
};
type IState = Readonly<typeof initialState>;

@observer
@inject('commonStore')
class SongSheet extends React.Component<IProps, IState> {
  public readonly state = initialState;
  public componentDidMount() {
    const commonStore = this.props.commonStore!;
    commonStore.toggleTabBar(false);
    this.fetchSongSheet(+this.props.match.params.id);
  }
  public fetchSongSheet = async (id: number) => {
    const res = await discoverAPI.fetchPlayListDetail(id);
    this.setState({ playlistData: res.data });
    const idArr = res.data.playlist.tracks.reduce((acc: number[], v: any) => {
      return acc.push(v.id), acc;
    }, []);
    const res2 = await discoverAPI.fetchSongDetail(idArr);
    this.setState({ songList: res2.data.data });
  };
  public image2base64 = (img: any) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    const mime = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
    const dataUrl = canvas.toDataURL('image/' + mime);
    return dataUrl;
  };
  public handleSaveCover = () => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = this.state.playlistData.playlist.coverImgUrl;
    image.onload = () => {
      const imageDataUrl = this.image2base64(image);
      const downloadDataUrlDom = document.getElementById('downloadDataUrl');
      if (downloadDataUrlDom) {
        downloadDataUrlDom.setAttribute('href', imageDataUrl);
        downloadDataUrlDom.setAttribute('href', imageDataUrl);
        downloadDataUrlDom.setAttribute(
          'download',
          `${this.state.playlistData.playlist.name}.png`
        );
        downloadDataUrlDom.click();
      }
    };
  };
  public showMask = (flag: boolean) => {
    this.setState({
      showMask: flag
    });
  };
  public render() {
    const { playlistData, songList } = this.state;
    console.log(songList);
    const bgStyle: React.CSSProperties = {
      backgroundImage: 'url(' + playlistData.playlist.coverImgUrl + ')'
    };
    return (
      <React.Fragment>
        <div className='songsheet-bg' style={bgStyle} />
        {!this.state.showMask ? (
          <div className='songsheet-main'>
            <div className='songsheet-head'>
              <div className='songsheet-head-cover'>
                <img src={playlistData.playlist.coverImgUrl} />
                {playlistData.playlist.highQuality ? (
                  <div className='cover-highQuality'>
                    <Icon iconName='#icon-huangguan' color='#fff' />
                  </div>
                ) : null}
                <span>
                  <Icon iconName='#icon-play' color='#fff' />
                  {playlistData.playlist.playCount}
                </span>
              </div>
              <div className='songsheet-head-info'>
                <h4 className='info-name'>{playlistData.playlist.name}</h4>
                <div className='info-creator'>
                  <img src={playlistData.playlist.creator.avatarUrl} />
                  <span>{playlistData.playlist.creator.nickname}</span>
                  <Icon iconName='#icon-arrow-right-copy-copy' color='#fff' />
                </div>
                <div className='info-desc' onClick={() => this.showMask(true)}>
                  <p>{playlistData.playlist.description}</p>
                  <Icon iconName='#icon-arrow-right-copy-copy' color='#fff' />
                </div>
              </div>
            </div>
            <div className='songsheet-action'>
              <ul>
                <li>
                  <Icon iconName='#icon-pinglun' color='#fff' fontSize={25} />
                  <span>{playlistData.playlist.commentCount}</span>
                </li>
                <li>
                  <Icon iconName='#icon-fenxiang' color='#fff' fontSize={25} />
                  <span>{playlistData.playlist.shareCount}</span>
                </li>
                <li>
                  <Icon iconName='#icon-xiazai' color='#fff' fontSize={25} />
                  <span>下载</span>
                </li>
                <li>
                  <Icon iconName='#icon-xiazai' color='#fff' fontSize={25} />
                  <span>多选</span>
                </li>
              </ul>
            </div>
            <div className='songsheet-list'>
              <div className='songsheet-list-head'>
                <div className='songsheet-list-head-info'>
                  <Icon
                    iconName='#icon-bofang'
                    color='#333'
                    fontSize={25}
                    style={{ marginRight: '1rem' }}
                  />
                  播放全部<span>(共{songList.length}首)</span>
                </div>
                <div className='songsheet-list-head-fav'>
                  <Icon
                    iconName='#icon-Plus'
                    color='#f1f1f1'
                    fontSize={13}
                    style={{
                      marginRight: '5'
                    }}
                  />
                  <span>收藏&nbsp;</span>
                  <span>({playlistData.playlist.subscribedCount})</span>
                </div>
              </div>
              <div className='songsheet-list-main'>
                {playlistData.playlist.tracks.map((song, i) => {
                  return (
                    <div key={i} className='songsheet-list-main-item'>
                      <span className='item-order'>{i + 1}</span>
                      <div>
                        <div className='item-songname'>
                          <span>{song.name}</span>
                        </div>
                        <div className='item-authorname'>
                          {song.ar.map((author, i2) => {
                            return (
                              <span key={i2}>
                                {author.name + (i2 > 1 ? '/ ' : '')}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <Icon
                        iconName='#icon-dashujukeshihuaico-'
                        fontSize={30}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className='shogsheet-mask'>
            <div className='mask-close' onClick={() => this.showMask(false)}>
              <Icon iconName='#icon-close2' color='#fff' />
            </div>
            <div className='mask-save' onClick={this.handleSaveCover}>
              保存封面
            </div>
            <a id='downloadDataUrl' />
            <div className='mask-main'>
              <img src={playlistData.playlist.coverImgUrl} alt='' />
              <h4>{playlistData.playlist.name}</h4>
              <i className='mask-divider' />
              <div className='mask-tags'>
                标签：
                {playlistData.playlist.tags.map((v, i) => {
                  return <li key={i}>{v}</li>;
                })}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: playlistData.playlist.description.replace(
                    /(\r\n|\n|\r)/gm,
                    '<br />'
                  )
                }}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SongSheet;
