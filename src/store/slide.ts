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
    public styleConvertToNum(target: any, attr: string) {
        return +target.style[attr].match(/\d+/);
    }
    @action
    public autoPlay(target: any) {
        this.timer = setInterval(() => {
            this.next(target);
        }, this.delay);
    }
    @action
    public cancelPlay() {
        clearInterval(this.timer);
    }
    @action
    public swipeBannerMove(evt: any, target: any) {
        const moveStart = evt.touches[0].clientX;
        const initLeft = this.styleConvertToNum(target, 'left');
        if (this.moveStart === 0) {
            this.moveStart = moveStart;
            return;
        }

        if (this.moveStart !== moveStart) {
            const moveOffset = this.moveStart - moveStart;
            const offsetLeft = initLeft + moveOffset;
            target.style.left = -offsetLeft + 'px';
            this.moveStart = moveStart;
        }
    }
    @action
    public swipeBannerStart(evt: any) {
        const swipeStart = evt.changedTouches[0].clientX;
        this.swipeStart = swipeStart;
    }
    @action
    public swipeBannerEnd(evt: any, target: any) {
        const swipeEnd = evt.changedTouches[0].clientX;
        const initPos = this.styleConvertToNum(target, 'left');
        if (this.swipeStart > swipeEnd) {
            if (this.swipeStart - swipeEnd > this.width / 2) {
                this.next(target, initPos);
            } else {
                animate(
                    this.duration,
                    initPos || this.offsetX - this.width,
                    this.offsetX,
                    this.move,
                    target,
                    this.fix
                );
            }
        } else {
            if (swipeEnd - this.swipeStart > this.width / 2) {
                this.prev(target, initPos);
            } else {
                animate(
                    this.duration,
                    initPos || this.offsetX + this.width,
                    this.offsetX,
                    this.move,
                    target,
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
    public next(target: any, initPos?: number) {
        this.curIndex++;
        this.offsetX = this.width * this.curIndex;
        animate(
            this.duration,
            initPos || this.offsetX - this.width,
            this.offsetX,
            this.move,
            target,
            this.fix
        );
    }

    public prev(target: any, initPos?: number) {
        this.curIndex--;
        this.offsetX = this.width * this.curIndex;
        animate(
            this.duration,
            initPos || this.offsetX + this.width,
            this.offsetX,
            this.move,
            target,
            this.fix
        );
    }
    @action
    public resize(width: number) {
        this.width = width;
        this.offsetX = this.curIndex * this.width;
    }
    @action
    public move = (target: any, offset: number) => {
        target.style.left = -offset + 'px';
    };
    @action
    public fix = (target: any) => {
        if (this.curIndex === this.Len - 1) {
            this.curIndex = 1;
            this.offsetX = this.width;
            target.style.left = -this.offsetX + 'px';
        }
        if (this.curIndex === 0) {
            this.curIndex = this.Len - 2;
            this.offsetX = this.curIndex * this.width;
            target.style.left = -this.offsetX + 'px';
        }
    };
}
