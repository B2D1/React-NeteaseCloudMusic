import request from './request';

const URL = {
    banner: '/banner',
    personalized: '/personalized',
};

class DiscoverAPI {
    public async fetchBanner() {
        return await request.get(URL.banner);
    }
    public async fetchRecSongList() {
        return await request.get(URL.personalized);
    }
}

export default DiscoverAPI;
