import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToBasket } from '../features/basket/basketSlice';

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    const dispatch = useAppDispatch();

    return (
        <section className="products-card">
            <div className="section-title">
                <h2>Products</h2>
            </div>

            <div className="products-list">
                {products.map((product) => (
                    <div className="product-row" key={product.id}>
                        <span className="product-name">
                            {product.name}
                        </span>

                        <span className="product-price">
                            £{product.price.toFixed(2)}
                        </span>

                        <button
                            className="add-button"
                            onClick={() =>
                                dispatch(addToBasket(product.id))
                            }
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductList;