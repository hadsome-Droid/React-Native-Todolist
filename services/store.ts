import {configureStore} from '@reduxjs/toolkit'
import {todolistsApi} from "@/services/todolists-api";

export const store = configureStore({
    reducer: {
        [todolistsApi.reducerPath]: todolistsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(todolistsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>