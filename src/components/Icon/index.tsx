import './index.scss';

import * as React from 'react';

/**
 * 生成icon图标 - 传入iconfont图标名称
 *
 */

interface IProps {
  /** iconName: [必传], iconfont上对应的图标名称 */
  iconName: string;
  /** color: [选传]，图标颜色 */
  color?: string;
  /** fontSize: [选传]，图标大小 */
  fontSize?: number;
  /** style: [选传], 图标自定义style */
  style?: object;
  /** marginRight: [选传], 图标右边距 */
  marginRight?: string;
  /** onClick: [选传], 点击事件 */
  onClick?: React.MouseEventHandler<any>;
}

class IconInfo extends React.Component<IProps> {
  public render() {
    const { iconName, color, fontSize, marginRight, onClick } = this.props;
    const style = {
      color: color || '#fff',
      fontSize: fontSize || 16,
      marginRight,
      ...this.props.style
    };
    return (
      <svg className='icon' aria-hidden='true' style={style} onClick={onClick}>
        <use xlinkHref={iconName} />
      </svg>
    );
  }
}

export default IconInfo;
