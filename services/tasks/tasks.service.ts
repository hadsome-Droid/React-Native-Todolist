import {todolistsApi} from "@/services/todolists-api";
import {TaskPriorities, TaskStatuses} from '@/enums/common.enums'

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};

type UpdateTask = UpdateTaskModelType & {
    todolistId: string
    taskId: string
}

export const tasksService = todolistsApi.injectEndpoints({
    endpoints: builder => {
        return {
            getTasks: builder.query<any, string>({
                query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
                providesTags: ['Tasks']
            }),
            createTask: builder.mutation<any, any>({
                query: ({todolistId, title}) => ({
                    url: `/todo-lists/${todolistId}/tasks`,
                    method: 'POST',
                    body: {title},
                }),
                invalidatesTags: ['Tasks']
            }),
            updateTaskTitle: builder.mutation<any, any>({
                query: ({todolistId, taskId, title}) => ({
                    url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                    method: 'PUT',
                    body: {title},
                }),
                invalidatesTags: ['Tasks']
            }),
            removeTask: builder.mutation<any, any>({
                query: ({todolistId, taskId}) => ({
                    url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                    method: 'DELETE',
                    body: {},
                }),
                invalidatesTags: ['Tasks']
            })

        }
    },
})

export const {useGetTasksQuery,  useCreateTaskMutation, useUpdateTaskTitleMutation, useRemoveTaskMutation} = tasksService

