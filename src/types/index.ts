export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface BasketItem {
    productId: string;
    quantity: number;
}

export type OfferType =
    | 'BUY_ONE_GET_ONE'
    | 'TRIGGER_DISCOUNT'
    | 'PERCENTAGE_DISCOUNT';

export interface Offer {
    id: string;
    name: string;
    description: string;
    type: OfferType;
    enabled: boolean;

    buyProductId?: string;
    rewardProductId?: string;

    buyQuantity?: number;
    rewardQuantity?: number;

    discountPercentage?: number;
}

export interface AppliedOffer {
    offerId: string;
    name: string;
    description: string;
    saving: number;
}