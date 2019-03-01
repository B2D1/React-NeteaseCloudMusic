import { action, observable, runInAction } from 'mobx';

import DiscoverAPI from '../api/discover';
import animate from '../utils/animate';

const discoverAPI = new DiscoverAPI();

export default class Slide {
    public delay: number = 3000;
    public duration: number = 500;
    @observable public banners: any[] = [];
    @observable public Len: number = 0;
    @observable public curIndex: number = 1;
    @observable public width: number = 0;
    @observable public offsetX: number = 0;
    @observable public swipeStart: number = 0;
    @observable public swipeEnd: number = 0;
    @observable public moveStart: number = 0;
    @observable public timer: any = null;
    public styleConvertToNum(elem: HTMLElement, attr: string) {
        return +elem.style[attr].match(/\d+/);
    }
    @action
    public autoPlay(elem: HTMLElement) {
        this.timer = setInterval(() => {
            this.next(elem);
        }, this.delay);
    }
    @action
    public cancelPlay() {
        this.timer = clearInterval(this.timer);
    }
    @action
    public init(elem: HTMLElement) {
        this.timer = clearInterval(this.timer);
        this.curIndex = 1;
        this.offsetX = this.curIndex * this.width;
        elem.style.left = -this.offsetX + 'px';
    }
    @action
    public swipeBannerMove(evt: React.TouchEvent, elem: HTMLElement) {
        const moveStart = evt.touches[0].clientX;
        const initLeft = this.styleConvertToNum(elem, 'left');
        if (this.moveStart === 0) {
            this.moveStart = moveStart;
            return;
        }

        if (this.moveStart !== moveStart) {
            const moveOffset = this.moveStart - moveStart;
            const offsetLeft = initLeft + moveOffset;
            elem.style.left = -offsetLeft + 'px';
            this.moveStart = moveStart;
        }
    }
    @action
    public swipeBannerStart(evt: React.TouchEvent) {
        const swipeStart = evt.changedTouches[0].clientX;
        this.swipeStart = swipeStart;
    }
    @action
    public swipeBannerEnd(evt: React.TouchEvent, elem: HTMLElement) {
        const swipeEnd = evt.changedTouches[0].clientX;
        const initPos = this.styleConvertToNum(elem, 'left');
        if (this.swipeStart > swipeEnd) {
            if (this.swipeStart - swipeEnd > this.width / 2) {
                this.next(elem, initPos);
            } else {
                animate(
                    this.duration,
                    initPos || this.offsetX - this.width,
                    this.offsetX,
                    this.move,
                    elem,
                    this.fix
                );
            }
        } else {
            if (swipeEnd - this.swipeStart > this.width / 2) {
                this.prev(elem, initPos);
            } else {
                animate(
                    this.duration,
                    initPos || this.offsetX + this.width,
                    this.offsetX,
                    this.move,
                    elem,
                    this.fix
                );
            }
        }
        this.moveStart = 0;
        this.swipeStart = 0;
    }
    @action
    public async fetchBanner() {
        const res = await discoverAPI.fetchBanner();
        runInAction(() => {
            const { banners } = res.data;
            const last = banners[banners.length - 1];
            const first = banners[0];
            this.banners = res.data.banners;
            this.banners.push(first);
            this.banners.unshift(last);
            this.Len = this.banners.length;
        });
    }
    @action
    public next(elem: HTMLElement, initPos?: number) {
        this.curIndex++;
        this.offsetX = this.width * this.curIndex;
        animate(
            this.duration,
            initPos || this.offsetX - this.width,
            this.offsetX,
            this.move,
            elem,
            this.fix
        );
    }

    public prev(elem: HTMLElement, initPos?: number) {
        this.curIndex--;
        this.offsetX = this.width * this.curIndex;
        animate(
            this.duration,
            initPos || this.offsetX + this.width,
            this.offsetX,
            this.move,
            elem,
            this.fix
        );
    }
    @action
    public resize(width: number) {
        this.width = width;
        this.offsetX = this.curIndex * this.width;
    }
    @action
    public move = (elem: HTMLElement, offset: number) => {
        elem.style.left = -offset + 'px';
    };
    @action
    public fix = (elem: HTMLElement) => {
        if (this.curIndex === this.Len - 1) {
            this.curIndex = 1;
            this.offsetX = this.curIndex * this.width;
            elem.style.left = -this.offsetX + 'px';
        }
        if (this.curIndex === 0) {
            this.curIndex = this.Len - 2;
            this.offsetX = this.curIndex * this.width;
            elem.style.left = -this.offsetX + 'px';
        }
    };
}
