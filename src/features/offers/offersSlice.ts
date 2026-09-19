import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Offer } from '../../types';

const initialState: Offer[] = [
    {
        id: 'cheese-offer',
        name: 'Cheese Offer',
        description:
            'Buy a Cheese, get a second Cheese free!',
        type: 'BUY_ONE_GET_ONE',
        enabled: true,
        buyProductId: 'cheese',
        rewardProductId: 'cheese',
        buyQuantity: 1,
        rewardQuantity: 1,
    },

    {
        id: 'soup-bread-offer',
        name: 'Soup & Bread Offer',
        description:
            'Buy a Soup, get a Bread at half price!',
        type: 'TRIGGER_DISCOUNT',
        enabled: true,
        buyProductId: 'soup',
        rewardProductId: 'bread',
        buyQuantity: 1,
        discountPercentage: 50,
    },

    {
        id: 'butter-offer',
        name: 'Butter Offer',
        description:
            'Get a third off Butter!',
        type: 'PERCENTAGE_DISCOUNT',
        enabled: true,
        rewardProductId: 'butter',
        discountPercentage: 33.333333,
    },
];

const offersSlice = createSlice({
    name: 'offers',

    initialState,

    reducers: {
        toggleOffer: (
            state,
            action: PayloadAction<string>
        ) => {
            const offer = state.find(
                (item) =>
                    item.id === action.payload
            );

            if (offer) {
                offer.enabled = !offer.enabled;
            }
        },

        updateOffer: (
            state,
            action: PayloadAction<{
                id: string;
                changes: Partial<Offer>;
            }>
        ) => {
            const offer = state.find(
                (item) =>
                    item.id === action.payload.id
            );

            if (offer) {
                Object.assign(
                    offer,
                    action.payload.changes
                );
            }
        },
    },
});

export const {
    toggleOffer,
    updateOffer,
} = offersSlice.actions;

export default offersSlice.reducer;