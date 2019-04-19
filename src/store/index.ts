import CommonStore from './common';
import SlideStore from './slide';
import HomeStore from './home';

const rootStore = {
  commonStore: new CommonStore(),
  slideStore: new SlideStore(),
  homeStore: new HomeStore()
};

export default rootStore;
