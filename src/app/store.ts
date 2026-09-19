import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/products/productsSlice';
import basketReducer from '../features/basket/basketSlice';
import offersReducer from '../features/offers/offersSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        basket: basketReducer,
        offers: offersReducer,
    },
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch =
    typeof store.dispatch;