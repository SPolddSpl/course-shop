import { TagFaces } from '@material-ui/icons';
import axios from 'axios';
class UserService {
    constructor(props) {
        this.basePath = 'http://localhost:3000';
        this.token = localStorage.getItem('token');
    }

    async logIn(user) {
        try {
            const res = await axios.post(`${this.basePath}/user/login`, user);
            if (res.status === 201 || res.status === 200) {
                localStorage.setItem('token', res.data.access_token)
                localStorage.setItem('user', JSON.stringify(res.data.userdata))
                return res.data;
            } else {
                return alert(res.statusText);
            }
        } catch (e) {
            throw e;
        }
    }


    async registerUser(user) {
        try {
            const res = await axios.post(`${this.basePath}/user/create`, user)

            if (res.status === 201 || res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data))
                return res.data;
            } else {
                return alert(res.statusText);
            }
        } catch (e) {
            throw e;
        }
    }

    async getUserMenu(id) {
        try {
            const res = await axios.get(`${this.basePath}/user/menu/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });

            if (res.status === 201 || res.status === 200) {
                return res.data;
            } else {
                return alert(`Status: ${res.status}, Status Text: ${res.statusText}, getUserMenu`);
            }
        } catch (e) {
            throw e;
        }
    }

    getFile(filePath) {
        return `${this.basePath}/uploads/${filePath}`
    }

    async uploadFile(formData, userId) {
        try {
            const res = await axios.post(`${this.basePath}/files/upload/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return res.data;
        } catch (e) {
            return e;
        }
    }

    async updateUserAvatar(user) {
        try {
            const res = await axios.post(`${this.basePath}/user/updateAvatar`, user);
            return res.data;
        } catch (e) {
            return e;
        }
    }

    async getProducts() {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        return res.data;
    }

}

export default UserService;