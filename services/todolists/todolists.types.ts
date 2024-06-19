export interface Todolist {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type TodolistData = Todolist[];
