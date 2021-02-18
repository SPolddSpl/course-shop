import axios from 'axios';

export default class ProductsService {
    constructor(props) {
        this.basePath = 'http://localhost:3001'
    }

    async getProducts() {
        try {
            const response = await axios.get(`${this.basePath}/products`);
            if (response.data.length <= 0) {
                this.initFakeProducts();
            }
            return response.data;
        } catch (error) {
            throw (error)
        }
    }


    async initFakeProducts() {
        const products = [{
            id: 1,
            name: 'Apple',
            rating: 5,
            price: 5,
        },
        {
            id: 2,
            name: 'Banana',
            rating: 3,
            price: 4,
        },
        {
            id: 3,
            name: 'Blueberry',
            rating: 1,
            price: 2,
        }];

        try {
            products.forEach((x, index) => {
                let result = this.createProduct(x);
                if (index === products.length - 1) {
                    this.getProducts();
                }
            });
        } catch (error) {
            throw (error)
        }
    }


    async createProduct(product) {
        try {
            const response = await axios.post(`${this.basePath}/products`, product);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            return false;
        } catch (e) {
            throw (e)
        }
    }
}