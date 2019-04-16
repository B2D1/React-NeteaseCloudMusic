import request from './request';

enum URL {
  Banner = '/banner',
  Personalized = '/personalized',
  PlayListDetail = '/playlist/detail',
  SongDetail = '/song/url'
}

class DiscoverAPI {
  public async fetchBanner() {
    return await request.get(URL.Banner);
  }
  public async fetchRecSongList() {
    return await request.get(URL.Personalized);
  }
  public async fetchPlayListDetail(id: number) {
    return await request.get(`${URL.PlayListDetail}?id=${id}`);
  }
  public async fetchSongDetail(idArr: []) {
    return await request.get(`${URL.SongDetail}/?id=${idArr.join(',')}`);
  }
}

export default DiscoverAPI;
