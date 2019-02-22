import './index.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import SlideStore from '../../store/slide';
import throttle from '../../utils/throttle';

interface ISlide {
    slide: SlideStore;
}
@observer
class Slide extends React.Component<ISlide> {
    public myRef: any;
    public throttleNext = throttle(
        this.props.slide.next,
        this.props.slide,
        600
    );
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }
    public screenChange = () => {
        const { slide } = this.props;
        slide.resize(document.body.clientWidth);
        window.addEventListener('resize', () => {
            slide.resize(document.body.clientWidth);
        });
    };
    public componentDidMount() {
        this.props.slide.fetchBanner();
        this.screenChange();
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
                    ref={this.myRef}
                >
                    {slide.banners.map((v: any, i: number) => (
                        <div key={i} className='banner' style={bannerStyle}>
                            <img src={v.imageUrl} />
                        </div>
                    ))}
                </div>
                <button onClick={() => this.throttleNext(this.myRef.current,2,3)}>
                    next
                </button>
                <button onClick={() => slide.prev(this.myRef.current)}>
                    prev
                </button>
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
