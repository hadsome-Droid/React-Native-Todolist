import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
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
    tagTypes: ['Todolist'],
    endpoints: builder => {
        return {
            getTodolists: builder.query<TodolistData, void>({
                query: () => `/todo-lists`,
                providesTags: ['Todolist']
            }),
            updateTodolistTitle: builder.mutation<any, any>({
                query: ({id, title}) => ({
                    url: `/todo-lists/${id}`,
                    method: 'PUT',
                    // body: JSON.stringify({ title }),
                    body: {title},
                }),
                invalidatesTags: ['Todolist']
            }),
            createTodolist: builder.mutation<any, any>({
                query: ({title}) => ({
                    url: `/todo-lists`,
                    method: 'POST',
                    // body: JSON.stringify({ title }),
                    body: {title},
                }) ,
                invalidatesTags: ['Todolist']
            }),
            removeTodolist: builder.mutation<any, any>({
                query: ({id}) => ({
                    url: `/todo-lists/${id}`,
                    method: 'DELETE',
                    // body: JSON.stringify({ title }),
                }) ,
                invalidatesTags: ['Todolist']
            })
        }
    },
})


export const {useGetTodolistsQuery, useUpdateTodolistTitleMutation, useCreateTodolistMutation, useRemoveTodolistMutation} = todolistsApi
