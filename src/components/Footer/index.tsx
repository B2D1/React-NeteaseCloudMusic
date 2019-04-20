import './index.scss';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import Icon from '../../components/Icon';
import CommonStore from '../../store/common';

interface IProps extends RouteComponentProps {
  commonStore: CommonStore;
}
@inject('commonStore')
@observer
export default class Footer extends React.Component<IProps> {
  public render() {
    const activeColor = '#d43c33';
    const normalColor = 'rgba(1,1,1,.4)';
    const commonStore = this.props.commonStore!;
    const path = this.props.location.pathname;
    return commonStore.showTabBar ? (
      <div className='footer-container'>
        <NavLink to='/' exact={true}>
          <Icon
            iconName='#icon-faxian'
            fontSize={24}
            color={path === '/' ? activeColor : normalColor}
          />
          <span>发现</span>
        </NavLink>
        <NavLink to='/video'>
          <Icon
            iconName='#icon-shipin'
            fontSize={24}
            color={path === 'video' ? activeColor : normalColor}
          />
          <span>视频</span>
        </NavLink>
        <NavLink to='/mine'>
          <Icon
            iconName='#icon-yinle'
            fontSize={24}
            color={path === 'mine' ? activeColor : normalColor}
          />
          <span>我的</span>
        </NavLink>
        <NavLink to='/friend'>
          <Icon
            iconName='#icon-pengyou'
            fontSize={24}
            color={path === 'friend' ? activeColor : normalColor}
          />
          <span>朋友</span>
        </NavLink>
        <NavLink to='/account'>
          <Icon
            iconName='#icon-zhanghao'
            fontSize={24}
            color={path === 'account' ? activeColor : normalColor}
          />
          <span>账号</span>
        </NavLink>
      </div>
    ) : null;
  }
}
