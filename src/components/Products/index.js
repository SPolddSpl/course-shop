import React from 'react';
import ProductsService from '../../services/products-service/service';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.client = new ProductsService();
        this.productsTemplate = '';
    }

    componentDidMount() {
        this.getProducts();
    }


    async getProducts() {
        let products = await this.client.getProducts();
        this.setState({ products: products });
    }




    render() {

        if (this.state.products.length > 0) {
            const productList = this.state.products.map((x) => {
                return (
                    <div key={x.id} className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="card">
                                <img src="https://codyhouse.co/demo/squeezebox-portfolio-template/img/img.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Name: {x.name}</h5>
                                    <p className="card-text">Rating {x.rating}.</p>
                                    <p className="card-text">Price: {x.price}</p>
                                    <a  className="btn btn-primary">Buy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            console.log(productList)
            return (<>
                {productList}

            </>)
        }
        return (
            <div>p</div>
        )
    }
}