import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1',
        credentials: 'include',
        prepareHeaders: headers => {
            const apiKey = "db26f98d-ccc1-48ae-a714-6ba535db1385"
            headers.set('API-KEY', apiKey);
            return headers
        },
    }),
    endpoints: builder => {
        return {
            getTasks: builder.query<any, string>({
                query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
            }),
        }
    },
})


export const {useGetTasksQuery} = tasksApi