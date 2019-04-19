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
}

class IconInfo extends React.Component<IProps> {
  public render() {
    const { iconName, color, fontSize } = this.props;
    const style = {
      color: color || '#fff',
      fontSize: fontSize || 16,
      ...this.props.style
    };
    return (
      <svg className='icon' aria-hidden='true' style={style}>
        <use xlinkHref={iconName} />
      </svg>
    );
  }
}

export default IconInfo;
