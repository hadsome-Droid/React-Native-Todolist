import {createApi, EndpointBuilder, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TodolistData} from "@/services/todolists/todolists.types";


export const todolistsApi = createApi({
    reducerPath: 'todolistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1',
        credentials: 'include',
        prepareHeaders: headers => {
            const apiKey = "db26f98d-ccc1-48ae-a714-6ba535db1385"
            headers.set('API-KEY', apiKey);
            return headers
        },
    }),
    tagTypes: ['Todolist', 'Tasks'],
    endpoints: () => ({})
})

