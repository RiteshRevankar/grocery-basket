import type { Product } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToBasket } from '../features/basket/basketSlice';
import { calculateBill } from '../utils/calculations';

interface ProductListProps {
    products: Product[];
}




const MAX_BUDGET = 20;



const ProductList = ({ products }: ProductListProps) => {
    const dispatch = useAppDispatch();

    const productState = useAppSelector((state) => state.products);
    const basket = useAppSelector((state) => state.basket);
    const offers = useAppSelector((state) => state.offers);

    const bill = calculateBill(
        productState,
        basket,
        offers
    );


    return (
        <section className="products-card">
            <div className="section-title">
                <h2>Products</h2>
            </div>

            <div className="products-list">
                {products.map((product) => {
                    const canAdd = bill.total + product.price <= MAX_BUDGET;
                    return (


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
                                disabled={!canAdd}

                            >
                                Add
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default ProductList;