import axios from 'axios';
import { action, observable, runInAction } from 'mobx';

export default class User {
    @observable public name = 'bbd';
    @observable public age = 18;
    @action
    public changeName(name: string) {
        this.name = name;
    }
    @action
    public changeAge(age: number) {
        this.age = age;
    }
    @action
    public async fetchTodos() {
        const data = await axios.get(
            'https://b2d1.top:5000/api/todos/5c6a5b2f6622ab4bf6fed958/all'
        );
        runInAction(() => {
            console.log(data);
        });
    }
}
