import { action, observable, runInAction } from 'mobx';
import animate from '../utils/animate';
import HomeAPI from '../api/home';

const homeAPI = new HomeAPI();

export default class Slide {
    @observable public banners: any[] = [];
    @observable public Len: number = 0;
    @observable public curIndex: number = 1;
    @observable public width: number = 0;
    @observable public offsetX: number = 0;
    @action
    public async fetchBanner() {
        const res = await homeAPI.fetchBanner();
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
    public next(obj: any) {
        if (this.curIndex === this.Len - 1) {
            this.curIndex = 1;
            this.offsetX = this.width;
        }
        this.offsetX += this.width;
        this.curIndex++;
        animate(500, this.offsetX - this.width, this.offsetX, obj, this.move);
        return true;
    }
    public prev(obj: any) {
        if (this.curIndex === 0) {
            this.curIndex = this.Len - 2;
            this.offsetX = this.curIndex * this.width;
        }
        this.offsetX -= this.width;
        this.curIndex--;
        animate(500, this.offsetX + this.width, this.offsetX, obj, this.move);
        return true;
    }
    @action
    public resize(width: number) {
        this.width = width;
        this.offsetX = this.curIndex * this.width;
    }
    @action
    public move(obj: any, offset: number) {
        obj.style.left = -offset + 'px';
    }
}
