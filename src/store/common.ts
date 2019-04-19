import { action, observable } from 'mobx';

export default class CommonStore {
  @observable public showTabBar: boolean = true;
  @action
  public toggleTabBar(flag: boolean) {
    this.showTabBar = flag;
  }
}
