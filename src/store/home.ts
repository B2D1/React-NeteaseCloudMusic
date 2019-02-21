import { action, observable, runInAction } from 'mobx';

import HomeAPI from '../api/home';

const homeAPI = new HomeAPI();

export default class Home {
    @observable public banner: any[] = [];
    @action
    public async fetchBanner() {
        const res = await homeAPI.fetchBanner();
        runInAction(() => {
            this.banner = res.data.banners;
        });
    }
}
