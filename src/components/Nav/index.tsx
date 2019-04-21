import './index.scss';

import * as React from 'react';

import Icon from '../../components/Icon';

interface IProps {
  handleBack: any;
  title: string;
}

const initialState = {
  title: '歌单',
  scroll: false,
  animate: false
};

type IState = Readonly<typeof initialState>;

export default class Nav extends React.Component<IProps, IState> {
  public readonly state = initialState;
  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  public handleScroll = () => {
    const offsetY = document.documentElement.scrollTop;
    if (offsetY === 0) {
      this.setState({
        scroll: false,
        title: '歌单',
        animate: false
      });
    }
    if (0 < offsetY && offsetY < 90) {
      this.setState({ scroll: true, title: '歌单', animate: false });
    }
    if (offsetY >= 90) {
      this.setState({ title: this.props.title, animate: true });
    }
  };
  public render() {
    const blurStyle: React.CSSProperties = {
      background: 'rgba(0,0,0,0.05)'
    };
    return (
      <div className='nav-container' style={this.state.scroll ? blurStyle : {}}>
        <Icon
          iconName='#icon-jiantou-zuo'
          fontSize={20}
          marginRight='1.5rem'
          onClick={this.props.handleBack}
        />
        <div className='nav-info'>
          {this.state.animate ? (
            <div className='nav-info-title'>
              <span className='animation-text'>
                {this.state.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className='animation-text'>
                {this.state.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          ) : (
            <div className='nav-info-title'>{this.state.title}</div>
          )}

          <span className='nav-info-desc'>
            由B2D1倾情打造，欢迎star，提出建议
          </span>
        </div>
        <Icon iconName='#icon-sousuo1' fontSize={20} marginRight='2rem' />
        <Icon iconName='#icon-gengduo1' fontSize={20} />
      </div>
    );
  }
}
