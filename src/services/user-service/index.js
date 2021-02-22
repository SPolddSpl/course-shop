import axios from 'axios';

class UserService {
    constructor(props) {
        this.basePath = 'http://localhost:3000';
    }

    async logIn(user) {
        try {
            const res = await axios.post(`${this.basePath}/user/login`, user);
            if (res) {
                localStorage.setItem('user', JSON.stringify(res.data))
                return res.data;
            }
        } catch (e) {
            throw e;
        }
    }

}

export default UserService;