import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import BasketItem from './BasketItem';
import { calculateBill } from '../utils/calculations';

const Basket = () => {
    const products = useAppSelector(
        (state) => state.products
    );

    const basket = useAppSelector(
        (state) => state.basket
    );

    const offers = useAppSelector(
        (state) => state.offers
    );

    const bill = useMemo(
        () =>
            calculateBill(
                products,
                basket,
                offers
            ),
        [products, basket, offers]
    );

    return (
        <section className="basket-card">
            <div className="section-title">
                <h2>Basket</h2>
            </div>

            {basket.length === 0 ? (
                <div className="empty-basket">
                    <div className="empty-icon">🛒</div>

                    <h3>Your basket is empty</h3>

                    <p>
                        Add products to see your bill.
                    </p>
                </div>
            ) : (
                <>
                    <div className="basket-list">
                        {basket.map((basketItem) => {
                            const product = products.find(
                                (item) =>
                                    item.id === basketItem.productId
                            );

                            if (!product) {
                                return null;
                            }

                            const calculatedItem =
                                bill.items.find(
                                    (item) =>
                                        item.productId ===
                                        basketItem.productId
                                );

                            return (
                                <BasketItem
                                    key={product.id}
                                    product={product}
                                    quantity={basketItem.quantity}
                                    itemSaving={
                                        calculatedItem?.saving ?? 0
                                    }
                                    itemCost={
                                        calculatedItem?.cost ??
                                        product.price *
                                        basketItem.quantity
                                    }
                                />
                            );
                        })}
                    </div>


                    {/* Applied offers */}
                    {/* {bill.appliedOffers.length > 0 && (
                        <div className="applied-offers">
                            <h3>Special offers applied</h3>

                            {bill.appliedOffers.map(
                                (offer) => (
                                    <div
                                        className="applied-offer"
                                        key={offer.offerId}
                                    >
                                        <div>
                                            <strong>
                                                {offer.name}
                                            </strong>

                                            <span>
                                                {offer.description}
                                            </span>
                                        </div>

                                        <strong className="saving-value">
                                            -£
                                            {offer.saving.toFixed(2)}
                                        </strong>
                                    </div>
                                )
                            )}
                        </div>
                    )} */}

                    <div className="basket-summary">
                        <div className="summary-row">
                            <span>Sub Total:</span>

                            <strong>
                                £{bill.subtotal.toFixed(2)}
                            </strong>
                        </div>

                        <div className="summary-row savings-row">
                            <span>Savings:</span>

                            <strong>
                                -£{bill.savings.toFixed(2)}
                            </strong>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row total-row">
                            <span>Total Amount:</span>

                            <strong>
                                £{bill.total.toFixed(2)}
                            </strong>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Basket;