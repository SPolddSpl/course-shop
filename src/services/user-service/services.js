import axios from 'axios';

export default class Requests {
    constructor(props) {
        this.basePath = 'http://localhost:3001'
    }

    async getUsers() {
        try {
            let response = await axios.get(`${this.basePath}/users`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
            throw (error);
        }
    }

    async logIn(user) {
        try {
            let response = await axios.get(`${this.basePath}/users?login=${user.login}`);
            const foundUser = response.data.find(x => x.login === user.login);
            if (foundUser) {
                if (user.password === foundUser.password) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw (error)
        }
    }

    async createUser(user) {
        try {
            let response = await axios.post(`${this.basePath}/users`, user);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (error) {
            throw (error)
        }
    }
}