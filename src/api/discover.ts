import request from './request';

const URL = {
    banner: '/banner',
};

class DiscoverAPI {
    public async fetchBanner() {
        return await request.get(URL.banner);
    }
}

export default DiscoverAPI;
