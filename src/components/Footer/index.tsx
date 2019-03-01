import * as React from 'react';
import './index.scss';
import IconDiscover from '../../assets/icon/discover.svg';
import IconAccount from '../../assets/icon/account.svg';
import IconFriend from '../../assets/icon/friend.svg';
import IconVideo from '../../assets/icon/video.svg';
import IconMine from '../../assets/icon/mine.svg';
import { NavLink } from 'react-router-dom';

export default class Footer extends React.Component {
    public render() {
        const path = window.location.pathname;
        return (
            <div className='footer-container'>
                <NavLink to='/' exact={true}>
                    <IconDiscover
                        width={25}
                        height={25}
                        fill={path === '/' ? '#d43c33' : 'rgba(1,1,1,.4)'}
                    />
                    <span>发现</span>
                </NavLink>
                <NavLink to='/video'>
                    <IconVideo
                        width={25}
                        height={25}
                        fill={path === '/video' ? '#d43c33' : 'rgba(1,1,1,.4)'}
                    />
                    <span>视频</span>
                </NavLink>
                <NavLink to='/mine'>
                    <IconMine
                        width={25}
                        height={25}
                        fill={path === '/mine' ? '#d43c33' : 'rgba(1,1,1,.4)'}
                    />
                    <span>我的</span>
                </NavLink>
                <NavLink to='/friend'>
                    <IconFriend
                        width={25}
                        height={25}
                        fill={path === '/friend' ? '#d43c33' : 'rgba(1,1,1,.4)'}
                    />
                    <span>朋友</span>
                </NavLink>
                <NavLink to='/account'>
                    <IconAccount
                        width={25}
                        height={25}
                        fill={path === '/account' ? '#d43c33' : 'rgba(1,1,1,.4)'}
                    />
                    <span>账号</span>
                </NavLink>
            </div>
        );
    }
}
