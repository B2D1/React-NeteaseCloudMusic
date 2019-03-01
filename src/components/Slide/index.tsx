import './index.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import SlideStore from '../../store/slide';

interface ISlide {
    slide: SlideStore;
}
@observer
class Slide extends React.Component<ISlide> {
    public slideRef: any;
    constructor(props: any) {
        super(props);
        this.slideRef = React.createRef();
    }
    public screenChange = () => {
        const { slide } = this.props;
        slide.resize(document.body.clientWidth);
        window.addEventListener('resize', () => {
            slide.resize(document.body.clientWidth);
        });
    };
    public componentDidMount() {
        const { slide } = this.props;
        slide.fetchBanner();
        slide.init(this.slideRef.current);
        slide.autoPlay(this.slideRef.current);
        this.screenChange();
    }
    public componentWillUnmount() {
        const { slide } = this.props;
        slide.cancelPlay();
    }
    public render() {
        const { slide } = this.props;
        const slideStyle = {
            width: slide.banners.length * slide.width,
        };
        const bannerStyle = {
            width: slide.width,
        };
        const offsetXStyle = {
            left: -slide.offsetX,
        };
        return (
            <div className='slide-container'>
                <div
                    className='banner-container'
                    style={{
                        ...slideStyle,
                        ...offsetXStyle,
                    }}
                    ref={this.slideRef}
                    onTouchMove={() => slide.cancelPlay()}
                    onTouchEnd={() => slide.autoPlay(this.slideRef.current)}
                >
                    {slide.banners.map((v: any, i: number) => (
                        <div
                            key={i}
                            className='banner'
                            style={bannerStyle}
                            onTouchStart={evt => {
                                slide.swipeBannerStart(evt);
                            }}
                            onTouchMove={evt => {
                                slide.swipeBannerMove(
                                    evt,
                                    this.slideRef.current
                                );
                            }}
                            onTouchEnd={evt => {
                                slide.swipeBannerEnd(
                                    evt,
                                    this.slideRef.current
                                );
                            }}
                        >
                            <img src={v.imageUrl} />
                        </div>
                    ))}
                </div>
                <div className='indicator'>
                    <ul>
                        {slide.banners.map((v: any, i: number) =>
                            i && i !== slide.Len - 1 ? (
                                i === slide.curIndex ||
                                (slide.curIndex === slide.Len - 1 && i === 1) ||
                                (slide.curIndex === 0 &&
                                    i === slide.Len - 2) ? (
                                    <li key={i} className='active-indicator' />
                                ) : (
                                    <li key={i} />
                                )
                            ) : null
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Slide;
