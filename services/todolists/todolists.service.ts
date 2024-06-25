import {todolistsApi} from "@/services/todolists-api";
import {TodolistData} from "@/services/todolists/todolists.types";


export const todolistsService = todolistsApi.injectEndpoints({
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
                }),
                invalidatesTags: ['Todolist']
            }),
            removeTodolist: builder.mutation<any, any>({
                query: ({id}) => ({
                    url: `/todo-lists/${id}`,
                    method: 'DELETE',
                    // body: JSON.stringify({ title }),
                }),
                invalidatesTags: ['Todolist']
            })
        }
    },
})

export const {
    useGetTodolistsQuery,
    useUpdateTodolistTitleMutation,
    useCreateTodolistMutation,
    useRemoveTodolistMutation
} = todolistsService