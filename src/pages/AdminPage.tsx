import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
    updateProductPrice,
} from '../features/products/productsSlice';

import {
    toggleOffer,
    updateOffer,
} from '../features/offers/offersSlice';

interface AdminPageProps {
    onBack: () => void;
}

const AdminPage = ({
    onBack,
}: AdminPageProps) => {
    const dispatch = useAppDispatch();

    const products = useAppSelector(
        (state) => state.products
    );

    const offers = useAppSelector(
        (state) => state.offers
    );

    const cheeseOffer = offers.find(
        (offer) => offer.id === 'cheese-offer'
    );

    const soupBreadOffer = offers.find(
        (offer) => offer.id === 'soup-bread-offer'
    );

    const butterOffer = offers.find(
        (offer) => offer.id === 'butter-offer'
    );

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <span className="eyebrow">
                        ADMINISTRATION
                    </span>

                    <h1>Store Management</h1>

                    <p>
                        Manage product prices and special
                        offers.
                    </p>
                </div>

                <button
                    className="shop-button"
                    onClick={onBack}
                >
                    ← Back to Shop
                </button>
            </header>

            {/* PRODUCTS */}
            <section className="admin-section">
                <div className="admin-section-header">
                    <div>
                        <h2>Products & Prices</h2>

                        <p>
                            Update the current selling price
                            of each product.
                        </p>
                    </div>
                </div>

                <div className="admin-products">
                    {products.map((product) => (
                        <div
                            className="admin-product-row"
                            key={product.id}
                        >
                            <div>
                                <strong>
                                    {product.name}
                                </strong>

                                <span>
                                    Current price
                                </span>
                            </div>

                            <div className="admin-price-input">
                                <span>£</span>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={product.price}
                                    onChange={(event) =>
                                        dispatch(
                                            updateProductPrice({
                                                id: product.id,
                                                price: Number(
                                                    event.target.value
                                                ),
                                            })
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OFFERS */}
            <section className="admin-section">
                <div className="admin-section-header">
                    <div>
                        <h2>Special Offers</h2>

                        <p>
                            Configure the offers displayed to
                            customers.
                        </p>
                    </div>
                </div>

                <div className="admin-offers">

                    {/* CHEESE */}
                    {cheeseOffer && (
                        <div className="admin-offer-card">
                            <OfferHeader
                                title={cheeseOffer.name}
                                description={cheeseOffer.description}
                                enabled={cheeseOffer.enabled}
                                onToggle={() =>
                                    dispatch(
                                        toggleOffer(
                                            cheeseOffer.id
                                        )
                                    )
                                }
                            />

                            <div className="offer-fields">
                                <label>
                                    Buy quantity

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            cheeseOffer.buyQuantity ??
                                            1
                                        }
                                        onChange={(event) =>
                                            dispatch(
                                                updateOffer({
                                                    id: cheeseOffer.id,
                                                    changes: {
                                                        buyQuantity:
                                                            Number(
                                                                event.target
                                                                    .value
                                                            ),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </label>

                                <label>
                                    Free quantity

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            cheeseOffer.rewardQuantity ??
                                            1
                                        }
                                        onChange={(event) =>
                                            dispatch(
                                                updateOffer({
                                                    id: cheeseOffer.id,
                                                    changes: {
                                                        rewardQuantity:
                                                            Number(
                                                                event.target
                                                                    .value
                                                            ),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </label>
                            </div>

                            <OfferDescriptionInput
                                value={
                                    cheeseOffer.description
                                }
                                onChange={(value) =>
                                    dispatch(
                                        updateOffer({
                                            id: cheeseOffer.id,
                                            changes: {
                                                description: value,
                                            },
                                        })
                                    )
                                }
                            />
                        </div>
                    )}

                    {/* SOUP & BREAD */}
                    {soupBreadOffer && (
                        <div className="admin-offer-card">
                            <OfferHeader
                                title={soupBreadOffer.name}
                                description={
                                    soupBreadOffer.description
                                }
                                enabled={
                                    soupBreadOffer.enabled
                                }
                                onToggle={() =>
                                    dispatch(
                                        toggleOffer(
                                            soupBreadOffer.id
                                        )
                                    )
                                }
                            />

                            <div className="offer-fields">
                                <label>
                                    Soup quantity

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            soupBreadOffer.buyQuantity ??
                                            1
                                        }
                                        onChange={(event) =>
                                            dispatch(
                                                updateOffer({
                                                    id: soupBreadOffer.id,
                                                    changes: {
                                                        buyQuantity:
                                                            Number(
                                                                event.target
                                                                    .value
                                                            ),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </label>

                                <label>
                                    Bread discount %

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={
                                            soupBreadOffer.discountPercentage ??
                                            50
                                        }
                                        onChange={(event) =>
                                            dispatch(
                                                updateOffer({
                                                    id: soupBreadOffer.id,
                                                    changes: {
                                                        discountPercentage:
                                                            Number(
                                                                event.target
                                                                    .value
                                                            ),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </label>
                            </div>

                            <OfferDescriptionInput
                                value={
                                    soupBreadOffer.description
                                }
                                onChange={(value) =>
                                    dispatch(
                                        updateOffer({
                                            id: soupBreadOffer.id,
                                            changes: {
                                                description: value,
                                            },
                                        })
                                    )
                                }
                            />
                        </div>
                    )}

                    {/* BUTTER */}
                    {butterOffer && (
                        <div className="admin-offer-card">
                            <OfferHeader
                                title={butterOffer.name}
                                description={
                                    butterOffer.description
                                }
                                enabled={butterOffer.enabled}
                                onToggle={() =>
                                    dispatch(
                                        toggleOffer(
                                            butterOffer.id
                                        )
                                    )
                                }
                            />

                            <div className="offer-fields">
                                <label>
                                    Discount %

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={
                                            butterOffer.discountPercentage ??
                                            33.333333
                                        }
                                        onChange={(event) =>
                                            dispatch(
                                                updateOffer({
                                                    id: butterOffer.id,
                                                    changes: {
                                                        discountPercentage:
                                                            Number(
                                                                event.target
                                                                    .value
                                                            ),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                </label>
                            </div>

                            <OfferDescriptionInput
                                value={
                                    butterOffer.description
                                }
                                onChange={(value) =>
                                    dispatch(
                                        updateOffer({
                                            id: butterOffer.id,
                                            changes: {
                                                description: value,
                                            },
                                        })
                                    )
                                }
                            />
                        </div>
                    )}

                </div>
            </section>

            <div className="admin-note">
                Changes are applied immediately to the
                shopping basket.
            </div>
        </div>
    );
};


/* -----------------------------
   Small reusable components
------------------------------ */

interface OfferHeaderProps {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

const OfferHeader = ({
    title,
    description,
    enabled,
    onToggle,
}: OfferHeaderProps) => {
    return (
        <div className="offer-admin-header">
            <div>
                <h3>{title}</h3>

                <p>{description}</p>
            </div>

            {/* <button
                className={`status-toggle ${enabled ? 'enabled' : ''
                    }`}
                onClick={onToggle}
            >
                {enabled ? 'ON' : 'OFF'}
            </button> */}

            <button
                type="button"
                className={`status-toggle ${enabled ? 'enabled' : ''}`}
                onClick={onToggle}
                aria-label={enabled ? 'Disable offer' : 'Enable offer'}
                aria-pressed={enabled}
            >
                <span className="toggle-knob" />
            </button>
        </div>
    );
};


interface OfferDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const OfferDescriptionInput = ({
    value,
    onChange,
}: OfferDescriptionInputProps) => {
    return (
        <label className="description-field">
            Marquee text

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            />
        </label>
    );
};

export default AdminPage;