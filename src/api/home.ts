import request from './request';

const URL = {
    banner: '/banner',
};

class HomeAPI {
    public async fetchBanner() {
        return await request.get(URL.banner);
    }
}

export default HomeAPI;
