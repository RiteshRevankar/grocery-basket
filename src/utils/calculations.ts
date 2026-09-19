import type {
    AppliedOffer,
    BasketItem,
    Offer,
    Product,
} from '../types';

export interface CalculatedItem {
    productId: string;
    quantity: number;
    originalCost: number;
    saving: number;
    cost: number;
}

export interface BillCalculation {
    subtotal: number;
    savings: number;
    total: number;
    items: CalculatedItem[];
    appliedOffers: AppliedOffer[];
}

const roundMoney = (
    value: number
): number => {
    return Math.round(
        (value + Number.EPSILON) * 100
    ) / 100;
};

const getQuantity = (
    basket: BasketItem[],
    productId: string
): number => {
    return (
        basket.find(
            (item) =>
                item.productId === productId
        )?.quantity ?? 0
    );
};

export const calculateBill = (
    products: Product[],
    basket: BasketItem[],
    offers: Offer[]
): BillCalculation => {
    const calculatedItems: CalculatedItem[] =
        basket.map((basketItem) => {
            const product = products.find(
                (item) =>
                    item.id === basketItem.productId
            );

            const originalCost = product
                ? product.price *
                basketItem.quantity
                : 0;

            return {
                productId: basketItem.productId,
                quantity: basketItem.quantity,
                originalCost,
                saving: 0,
                cost: originalCost,
            };
        });

    const appliedOffers: AppliedOffer[] = [];

    /*
     * ----------------------------------------
     * CHEESE: Buy 1 Get 1 Free
     * ----------------------------------------
     */
    const cheeseOffer = offers.find(
        (offer) =>
            offer.id === 'cheese-offer' &&
            offer.enabled
    );

    if (
        cheeseOffer &&
        cheeseOffer.rewardProductId
    ) {
        const cheeseQuantity = getQuantity(
            basket,
            cheeseOffer.rewardProductId
        );

        const cheeseProduct = products.find(
            (product) =>
                product.id ===
                cheeseOffer.rewardProductId
        );

        if (cheeseProduct) {
            const buyQuantity =
                cheeseOffer.buyQuantity ?? 1;

            const freeQuantity =
                cheeseOffer.rewardQuantity ?? 1;

            /*
             * For the default 1 + 1 offer:
             *
             * 1 cheese -> 0 free
             * 2 cheese -> 1 free
             * 3 cheese -> 1 free
             * 4 cheese -> 2 free
             */
            const groups = Math.floor(
                cheeseQuantity /
                (buyQuantity + freeQuantity)
            );

            const freeItems =
                groups * freeQuantity;

            const saving =
                freeItems * cheeseProduct.price;

            const item =
                calculatedItems.find(
                    (calculatedItem) =>
                        calculatedItem.productId ===
                        cheeseProduct.id
                );

            if (item && saving > 0) {
                item.saving += saving;
                item.cost -= saving;

                appliedOffers.push({
                    offerId: cheeseOffer.id,
                    name: cheeseOffer.name,
                    description:
                        cheeseOffer.description,
                    saving: roundMoney(saving),
                });
            }
        }
    }

    /*
     * ----------------------------------------
     * SOUP -> BREAD DISCOUNT
     * ----------------------------------------
     */
    const soupBreadOffer = offers.find(
        (offer) =>
            offer.id ===
            'soup-bread-offer' &&
            offer.enabled
    );

    if (
        soupBreadOffer &&
        soupBreadOffer.buyProductId &&
        soupBreadOffer.rewardProductId
    ) {
        const soupQuantity = getQuantity(
            basket,
            soupBreadOffer.buyProductId
        );

        const breadQuantity = getQuantity(
            basket,
            soupBreadOffer.rewardProductId
        );

        const breadProduct = products.find(
            (product) =>
                product.id ===
                soupBreadOffer.rewardProductId
        );

        if (breadProduct) {
            const soupRequired =
                soupBreadOffer.buyQuantity ?? 1;

            const eligibleBreadQuantity =
                Math.floor(
                    soupQuantity / soupRequired
                );

            const discountedBreadQuantity =
                Math.min(
                    breadQuantity,
                    eligibleBreadQuantity
                );

            const discountPercentage =
                soupBreadOffer.discountPercentage ??
                50;

            const saving =
                discountedBreadQuantity *
                breadProduct.price *
                (discountPercentage / 100);

            const item =
                calculatedItems.find(
                    (calculatedItem) =>
                        calculatedItem.productId ===
                        breadProduct.id
                );

            if (item && saving > 0) {
                item.saving += saving;
                item.cost -= saving;

                appliedOffers.push({
                    offerId:
                        soupBreadOffer.id,
                    name:
                        soupBreadOffer.name,
                    description:
                        soupBreadOffer.description,
                    saving: roundMoney(saving),
                });
            }
        }
    }

    /*
     * ----------------------------------------
     * BUTTER PERCENTAGE DISCOUNT
     * ----------------------------------------
     */
    const butterOffer = offers.find(
        (offer) =>
            offer.id === 'butter-offer' &&
            offer.enabled
    );

    if (
        butterOffer &&
        butterOffer.rewardProductId
    ) {
        const butterQuantity = getQuantity(
            basket,
            butterOffer.rewardProductId
        );

        const butterProduct = products.find(
            (product) =>
                product.id ===
                butterOffer.rewardProductId
        );

        if (butterProduct) {
            const discountPercentage =
                butterOffer.discountPercentage ??
                0;

            const saving =
                butterQuantity *
                butterProduct.price *
                (discountPercentage / 100);

            const item =
                calculatedItems.find(
                    (calculatedItem) =>
                        calculatedItem.productId ===
                        butterProduct.id
                );

            if (item && saving > 0) {
                item.saving += saving;
                item.cost -= saving;

                appliedOffers.push({
                    offerId: butterOffer.id,
                    name: butterOffer.name,
                    description:
                        butterOffer.description,
                    saving: roundMoney(saving),
                });
            }
        }
    }

    const subtotal = calculatedItems.reduce(
        (sum, item) =>
            sum + item.originalCost,
        0
    );

    const savings = calculatedItems.reduce(
        (sum, item) =>
            sum + item.saving,
        0
    );

    const total = subtotal - savings;

    return {
        subtotal: roundMoney(subtotal),
        savings: roundMoney(savings),
        total: roundMoney(total),

        items: calculatedItems.map(
            (item) => ({
                ...item,
                originalCost:
                    roundMoney(
                        item.originalCost
                    ),
                saving: roundMoney(item.saving),
                cost: roundMoney(item.cost),
            })
        ),

        appliedOffers,
    };
};