import axios from 'axios';

class ProductsService {
    constructor(props) {
        this.basePath = 'http://localhost:3000';
        this.token = localStorage.getItem('token');
    }

    async getProducts() {
        try {
            const res = await axios.get(`${this.basePath}/products`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            if (res.status === 201 || res.status === 200) {
                return res.data;
            } else {
                return alert(res.statusText);
            }
        } catch (e) {
            throw e;
        }
    }
}

export default ProductsService;