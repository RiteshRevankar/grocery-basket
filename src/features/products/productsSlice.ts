import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../types';

const initialState: Product[] = [
    {
        id: 'bread',
        name: 'Bread',
        price: 1.1,
    },
    {
        id: 'milk',
        name: 'Milk',
        price: 0.5,
    },
    {
        id: 'cheese',
        name: 'Cheese',
        price: 0.9,
    },
    {
        id: 'soup',
        name: 'Soup',
        price: 0.6,
    },
    {
        id: 'butter',
        name: 'Butter',
        price: 1.2,
    },
];

const productsSlice = createSlice({
    name: 'products',

    initialState,

    reducers: {
        updateProductPrice: (
            state,
            action: PayloadAction<{
                id: string;
                price: number;
            }>
        ) => {
            const product = state.find(
                (item) =>
                    item.id === action.payload.id
            );

            if (product) {
                product.price =
                    action.payload.price;
            }
        },
    },
});

export const {
    updateProductPrice,
} = productsSlice.actions;

export default productsSlice.reducer;