import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { BasketItem } from '../../types';

const initialState: BasketItem[] = [];

const basketSlice = createSlice({
    name: 'basket',

    initialState,

    reducers: {
        addToBasket: (
            state,
            action: PayloadAction<string>
        ) => {
            const existing = state.find(
                (item) =>
                    item.productId ===
                    action.payload
            );

            if (existing) {
                existing.quantity += 1;
            } else {
                state.push({
                    productId: action.payload,
                    quantity: 1,
                });
            }
        },

        increaseQuantity: (
            state,
            action: PayloadAction<string>
        ) => {
            const item = state.find(
                (basketItem) =>
                    basketItem.productId ===
                    action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (
            state,
            action: PayloadAction<string>
        ) => {
            const item = state.find(
                (basketItem) =>
                    basketItem.productId ===
                    action.payload
            );

            if (!item) return;

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                const index =
                    state.indexOf(item);

                state.splice(index, 1);
            }
        },
    },
});

export const {
    addToBasket,
    increaseQuantity,
    decreaseQuantity,
} = basketSlice.actions;

export default basketSlice.reducer;