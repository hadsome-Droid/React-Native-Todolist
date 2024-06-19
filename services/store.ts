import {configureStore} from '@reduxjs/toolkit'
import {todolistsApi} from "@/services/todolists-api";
import {tasksApi} from "@/services/tasks-api";

export const store = configureStore({
    reducer: {
        [todolistsApi.reducerPath]: todolistsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(todolistsApi.middleware).concat(tasksApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>