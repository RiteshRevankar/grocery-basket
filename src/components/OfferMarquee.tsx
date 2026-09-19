import { useAppSelector } from '../app/hooks';

const OfferMarquee = () => {
    const offers = useAppSelector(
        (state) => state.offers
    );

    const activeOffers = offers.filter(
        (offer) => offer.enabled
    );

    if (activeOffers.length === 0) {
        return null;
    }

    return (
        <div className="offer-marquee">
            <div className="marquee-track">
                {[...activeOffers, ...activeOffers].map(
                    (offer, index) => (
                        <div
                            className="marquee-offer"
                            key={`${offer.id}-${index}`}
                        >
                            <span className="marquee-star">
                                ★
                            </span>

                            {offer.description}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default OfferMarquee;