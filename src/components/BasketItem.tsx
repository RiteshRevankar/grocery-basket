import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import {
    decreaseQuantity,
    increaseQuantity,
} from '../features/basket/basketSlice';

interface BasketItemProps {
    product: Product;
    quantity: number;
    itemSaving: number;
    itemCost: number;
}

const BasketItem = ({
    product,
    quantity,
    itemSaving,
    itemCost,
}: BasketItemProps) => {
    const dispatch = useAppDispatch();

    const originalCost = product.price * quantity;

    return (
        <div className="basket-item">
            <div className="basket-main-row">
                <span className="basket-product-name">
                    {product.name}
                </span>

                <span className="basket-price">
                    £{product.price.toFixed(2)}
                </span>

                <div className="quantity-controls">
                    <button
                        className="quantity-button plus"
                        onClick={() =>
                            dispatch(increaseQuantity(product.id))
                        }
                        aria-label={`Increase ${product.name}`}
                    >
                        +
                    </button>

                    <span className="quantity">
                        {quantity}
                    </span>

                    <button
                        className="quantity-button minus"
                        onClick={() =>
                            dispatch(decreaseQuantity(product.id))
                        }
                        aria-label={`Decrease ${product.name}`}
                    >
                        -
                    </button>
                </div>
            </div>

            <div className="item-price-row">
                Item price&nbsp;&nbsp;
                £{product.price.toFixed(2)} × {quantity} = £
                {originalCost.toFixed(2)}
            </div>

            {itemSaving > 0 && (
                <div className="item-savings">
                    Savings&nbsp;&nbsp;£{itemSaving.toFixed(2)}
                </div>
            )}

            <div className="item-cost">
                Item cost&nbsp;&nbsp;£{itemCost.toFixed(2)}
            </div>
        </div>
    );
};

export default BasketItem;